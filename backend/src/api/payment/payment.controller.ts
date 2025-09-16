import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import { InitPaymentRequest, PaymentHistoryResponse } from './dto'
import { PaymentService } from './payment.service'

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
	public constructor(private readonly paymentService: PaymentService) {}

	@ApiOperation({
		summary: 'Get payment history',
		description: 'Returns the list of all user transactions'
	})
	@ApiOkResponse({
		type: [PaymentHistoryResponse]
	})
	@Protected()
	@Get()
	public async getHistory(@Authorized() user: User) {
		return await this.paymentService.getHistory(user)
	}

	@Protected()
	@Post('init')
	public async init(
		@Body() dto: InitPaymentRequest,
		@Authorized() user: User
	) {
		return await this.paymentService.init(dto, user)
	}

	@Post('webhook')
	@HttpCode(HttpStatus.OK)
	public async webhook(@Body() dto: any) {
		console.log('PAYMENT WEBHOOK', dto)

		return dto
	}
}
