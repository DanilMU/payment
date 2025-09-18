import { Module } from '@nestjs/common'

import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { CryptoModule } from './providers/crypto/crypto.module'
import { StripeModule } from './providers/stripe/stripe.module'
import { YoomoneyModule } from './providers/yoomoney/yoomoney.module'
import { WebhookModule } from './webhook/webhook.module'

@Module({
	controllers: [PaymentController],
	providers: [PaymentService],
	imports: [WebhookModule, YoomoneyModule, StripeModule, CryptoModule]
})
export class PaymentModule {}
