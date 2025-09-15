import { Injectable, NotFoundException } from '@nestjs/common'
import { BillingPeriod, type User } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { InitPaymentRequest } from './dto/init-payment-dto'

@Injectable()
export class PaymentService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getHistory(user: User) {
		const payments = await this.prismaService.transaction.findMany({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				subscription: {
					include: {
						plan: true
					}
				}
			}
		})

		const formated = payments.map(payment => ({
			id: payment.id,
			createdAt: payment.createdAt,
			plan: payment.subscription.plan,
			amount: payment.amount,
			provider: payment.provider,
			status: payment.status
		}))

		return formated
	}

	public async init(dto: InitPaymentRequest, user: User) {
		const { planId, billingPeriod, provider } = dto

		const plan = await this.prismaService.plan.findUnique({
			where: {
				id: planId
			}
		})

		if (!plan) throw new NotFoundException('План не найден')

		const amount =
			billingPeriod === BillingPeriod.YEARLY
				? plan.yearlyPrice
				: plan.monthlyPrice

		const transaction = await this.prismaService.transaction.create({
			data: {
				amount,
				provider,
				billingPeriod,
				user: {
					connect: {
						id: user.id
					}
				},
				subscription: {
					create: {
						user: {
							connect: {
								id: user.id
							}
						},
						plan: {
							connect: {
								id: plan.id
							}
						}
					}
				}
			}
		})

		return transaction
	}
}
