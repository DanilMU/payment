import { ApiProperty } from '@nestjs/swagger'

export class PlanResponse {
	@ApiProperty({
		description: 'Unique indentifier of the plan',
		example: 'cmfgpdsgp0000v03kypv9oxdq'
	})
	public id: string

	@ApiProperty({
		description: 'Name of the subscription plan',
		example: 'Premium'
	})
	public title: string

	@ApiProperty({
		description: 'Description of the plan',
		example: 'Full access to all platform features'
	})
	public decription: string

	@ApiProperty({
		description: 'List of features included in the plan',
		example: [
			'Unlimited access to content',
			'Priority support',
			'Advanced analytics'
		],
		isArray: true
	})
	public features: string[]

	@ApiProperty({
		description: 'Monthly Price',
		example: '500'
	})
	public monthlyPrice: number

	@ApiProperty({
		description: 'yearlyPrice',
		example: 5000
	})
	public yearlyPrice: string

	@ApiProperty({
		description: 'Indicates whether the plan is featured or promoted',
		example: true
	})
	public isFeatured: boolean
}
