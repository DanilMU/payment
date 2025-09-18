import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type Plan, type Transaction } from '@prisma/client'
import { firstValueFrom } from 'rxjs'

import { CRYPTOPAY_API_URL } from '../../constants'

import {
	CreateInvoiceRequest,
	CreateInvoiceResponse,
	CryptoResponse,
	Currency,
	FiatCurrency,
	PaidButtonName
} from './interfaces'

@Injectable()
export class CryptoService {
	private readonly TOKEN: string

	public constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.TOKEN = this.configService.getOrThrow<string>('CRYPTO_PAY_TOKEN')
	}

	public async create(
		plan: Plan,
		transaction: Transaction
	): Promise<CreateInvoiceResponse> {
		const payload: CreateInvoiceRequest = {
			amount: transaction.amount,
			currency_type: Currency.FIAT,
			fiat: FiatCurrency.RUB,
			description: `Оплата подписки на тарифный план "${plan.title}"`,
			hidden_message: 'Спасибо за покупку! Подписка активирована',
			paid_btn_name: PaidButtonName.CALLBACK,
			paid_btn_url: 'https://a6ry9f-85-234-53-212.ru.tuna.am'
		}

		const response = await this.makeRequest<CreateInvoiceResponse>(
			'POST',
			'/createInvoice',
			payload
		)

		return response.result
	}

	private async makeRequest<T>(
		method: 'GET' | 'POST',
		endpoint: string,
		data?: any
	): Promise<T> {
		const headers = {
			'Crypto-Pay-Api-Token': this.TOKEN
		}

		const observable = this.httpService.request<CryptoResponse<T>>({
			baseURL: CRYPTOPAY_API_URL,
			url: endpoint,
			method,
			data,
			headers
		})

		const { data: response } = await firstValueFrom(observable)

		if (!response.ok) {
			throw new Error(`CryptoPay API error: ${JSON.stringify(response)}`)
		}

		return response.result
	}
}
