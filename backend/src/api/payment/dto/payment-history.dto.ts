import { ApiProperty } from '@nestjs/swagger'
import { PaymentProvider, TransactionStatus } from '@prisma/client'

export class PaymentHistoryResponse {
	@ApiProperty({
		description: 'Unique transaction identifier',
		example: 'HAlVRiJzqYBQdzUca9WVA'
	})
	public id: string
	@ApiProperty({
		description: 'Transaction created at',
		example: '2025-09-13T16:20:13.587Z'
	})
	public createdAt: Date
	@ApiProperty({
		description: 'Subscription plan name',
		example: 'Premium'
	})
	public plan: string
	@ApiProperty({
		description: 'Amount of the transaction',
		example: '2499'
	})
	public amount: number
	@ApiProperty({
		description: 'Payment provider',
		example: PaymentProvider.YOOKASSA,
		enum: PaymentProvider
	})
	public provider: PaymentProvider
	@ApiProperty({
		description: 'Transaction status',
		example: TransactionStatus.SUCCEEDED,
		enum: TransactionStatus
	})
	public status: TransactionStatus
}
