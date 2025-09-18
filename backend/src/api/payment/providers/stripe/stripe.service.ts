import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	BillingPeriod,
	type Plan,
	type Transaction,
	type User
} from '@prisma/client'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
	private readonly stripe: Stripe

	private readonly WEBHOOK_SECRET: string

	public constructor(private readonly configService: ConfigService) {
		this.stripe = new Stripe(
			this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
			{
				apiVersion: '2025-08-27.basil'
			}
		)

		this.WEBHOOK_SECRET = this.configService.getOrThrow<string>(
			'STRIPE_WEBHOOK_SECRET'
		)
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

		const success_url = 'https://a6ry9f-85-234-53-212.ru.tuna.am'
		const cancel_url = this.configService.getOrThrow<string>('APP_URL')

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer_email: user.email,
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: success_url,
			cancel_url: cancel_url
		})

		return session
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
