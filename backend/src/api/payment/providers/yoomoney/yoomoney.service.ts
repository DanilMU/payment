import { Injectable } from '@nestjs/common'
import { type Plan, type Transaction } from '@prisma/client'
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'

@Injectable()
export class YoomoneyService {
	public constructor(private readonly yookassaService: YookassaService) {}

	public async create(plan: Plan, transaction: Transaction) {
		const payment = await this.yookassaService.createPayment({
			amount: {
				value: transaction.amount,
				currency: CurrencyEnum.RUB
			},
			description: `Оплата подписки на тарифный план "${plan.title}"`,
			payment_method_data: {
				type: PaymentMethodsEnum.bank_card
			},
			confirmation: {
				type: ConfirmationEnum.redirect,
				return_url: 'https://a6ry9f-85-234-53-212.ru.tuna.am'
			},
			save_payment_method: true
		})
		return payment
	}
}
