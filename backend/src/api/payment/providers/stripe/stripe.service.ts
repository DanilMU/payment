import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	BillingPeriod,
	PaymentProvider,
	type Plan,
	type Transaction,
	TransactionStatus,
	type User
} from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import Stripe from 'stripe'

import { PaymentWebhookResult } from '../../interfaces'

@Injectable()
export class StripeService {
	private readonly stripe: Stripe

	private readonly WEBHOOK_SECRET: string

	private readonly APP_URL: string

	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		this.stripe = new Stripe(
			this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
			{
				apiVersion: '2025-08-27.basil'
			}
		)

		this.WEBHOOK_SECRET = this.configService.getOrThrow<string>(
			'STRIPE_WEBHOOK_SECRET'
		)

		this.APP_URL = this.configService.getOrThrow<string>('APP_URL')
	}

	public async create(
		plan: Plan,
		transaction: Transaction,
		user: User,
		billingPeriod: BillingPeriod
	) {
		const priceId =
			billingPeriod === BillingPeriod.MONTHLY
				? plan.stripeMonthlyPriceId
				: plan.stripeYearlyPriceId

		if (!priceId)
			throw new BadRequestException(
				'Stripe priceId is missing for this plan'
			)

		const successUrl = `${this.APP_URL}/payment/${transaction.id}/success`
		const cancelUrl = `${this.APP_URL}`

		let customerId = user.stripeCustomerId

		if (!customerId) {
			const customer = await this.stripe.customers.create({
				email: user.email,
				name: user.name
			})

			customerId = customer.id

			await this.prismaService.user.update({
				where: {
					id: user.id
				},
				data: {
					stripeCustomerId: customerId
				}
			})
		}

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer: customerId,
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: successUrl,
			cancel_url: cancelUrl,
			metadata: {
				transactionId: transaction.id,
				planId: plan.id,
				userId: user.id
			}
		})

		return session
	}

	public async handleWebhook(
		event: Stripe.Event
	): Promise<PaymentWebhookResult | null> {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = await this.stripe.checkout.sessions.retrieve(
					event.data.object.id,
					{ expand: ['line_items'] }
				)

				const transactionId = session.metadata?.transactionId
				const planId = session.metadata?.planId
				const userId = session.metadata?.userId

				const paymentId = session.id

				if (!transactionId || !planId) return null

				const stripeSubscriptionId = session.subscription as string

				if (userId && stripeSubscriptionId) {
					await this.prismaService.userSubscription.update({
						where: {
							userId
						},
						data: {
							stripeSubscriptionId
						}
					})
				}

				return {
					transactionId,
					planId,
					paymentId,
					status: TransactionStatus.SUCCEEDED,
					raw: event
				}
			}

			case 'invoice.payment_failed': {
				const invoice = event.data.object

				const transactionId = invoice.metadata?.transactionId
				const planId = invoice.metadata?.planId
				const paymentId = invoice.id

				if (!transactionId || !planId || !paymentId) return null

				return {
					transactionId,
					planId,
					paymentId,
					status: TransactionStatus.FAILED,
					raw: event
				}
			}

			default: {
				return null
			}
		}
	}

	public async parseEvent(
		rawBody: Buffer,
		signature: string
	): Promise<Stripe.Event> {
		try {
			return await this.stripe.webhooks.constructEventAsync(
				rawBody,
				signature,
				this.WEBHOOK_SECRET
			)
		} catch (error) {
			throw new BadRequestException(
				`Webhook signature verification: ${error.message}`
			)
		}
	}
}
