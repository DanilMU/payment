import { Injectable } from '@nestjs/common'
import { BillingPeriod, Plan, Transaction } from '@prisma/client'
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'

@Injectable()
export class YoomoneyService {
	public constructor(private readonly yookassaService: YookassaService) {}

	public async create(
		plan: Plan,
		transaction: Transaction,
		billengPeriod: BillingPeriod
	) {
		const amount =
			billengPeriod === BillingPeriod.MONTHLY
				? plan.monthlyPrice
				: plan.yearlyPrice

		const payment = await this.yookassaService.createPayment({
			amount: {
				value: amount,
				currency: CurrencyEnum.RUB
			},
			description: `Оплата подписки на тарифный план "${plan.title}"`,
			payment_method_data: {
				type: PaymentMethodsEnum.bank_card
			},
			confirmation: {
				type: ConfirmationEnum.redirect,
				return_url: ' https://73d73c048a68.ngrok-free.app'
			},
			save_payment_method: true
		})
		return payment
	}
}
