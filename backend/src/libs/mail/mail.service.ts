import { type ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import type { Transaction, User } from '@prisma/client'
import { render } from '@react-email/components'

import { PaymentFailedTemplate, PaymentSuccessTemplate } from './templates'

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name)

	public constructor(private readonly mailerService: MailerService) {}

	public async sendPaymentSuccessEmail(user: User, transaction: Transaction) {
		const html = await render(PaymentSuccessTemplate({ transaction }))

		await this.sendMail({
			to: user.email,
			subject: 'Платеж успешно обработан',
			html
		})
	}

	public async sendPaymentFailedEmail(user: User, transaction: Transaction) {
		const html = await render(PaymentFailedTemplate({ transaction }))

		await this.sendMail({
			to: user.email,
			subject: 'Проблема с обработкой платежа',
			html
		})
	}

	private async sendMail(options: ISendMailOptions) {
		try {
			await this.mailerService.sendMail(options)
		} catch (error) {
			this.logger.error(`Failed to sending email: `, error)
			throw error
		}
	}
}
