'use client'

import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

import { PlanResponse } from '@/api/types'

import { cn } from '@/lib/utils'

import { LayoutIconOne } from '../icons/layout-icon-one'
import { LayoutIconThree } from '../icons/layout-icon-three'
import { LayoutIconTwo } from '../icons/layout-icon-two'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'

export const icons = {
	Базовый: <LayoutIconOne className='size-9' />,
	Профессиональный: <LayoutIconTwo className='size-9' />,
	Бизнес: <LayoutIconThree className='size-9' />
}

interface PricingSectionProps {
	plans: PlanResponse[]
}

export function PricingSection({ plans }: PricingSectionProps) {
	const [isYearly, setIsYearly] = useState(false)

	const calculateYearlyDiscount = (
		monthlyPrice: number,
		yearlyPrice: number
	) => {
		const yearlyMonthly = yearlyPrice / 12

		const discount = ((monthlyPrice - yearlyMonthly) / monthlyPrice) * 100

		return Math.round(discount)
	}

	return (
		<section className='px-6 pb-20'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 flex justify-center'>
					<div className='flex flex-col items-center gap-4'>
						<div className='flex items-center gap-3 px-4 py-2'>
							<span
								className={cn(
									'text-sm font-medium transition-colors',
									isYearly ? 'text-gray-500' : 'text-gray-900'
								)}
							>
								Месячно
							</span>

							<Switch
								checked={isYearly}
								onCheckedChange={setIsYearly}
							/>

							<span
								className={cn(
									'text-sm font-medium transition-colors',
									isYearly ? 'text-gray-900' : 'text-gray-500'
								)}
							>
								Годовая
							</span>
						</div>
					</div>

					{isYearly && (
						<div className='rounded-lg bg-orange-500 px-3 py-1 text-xs font-medium text-white'>
							Экономия 20%
						</div>
					)}
				</div>

				<div className='grid gap-8 md:grid-cols-3'>
					{plans.map((plan, index) => {
						const displayPrice = isYearly
							? Math.round(plan.yearlyPrice / 12)
							: plan.monthlyPrice

						return (
							<Card
								key={index}
								className={cn(
									'relative rounded-3xl border-0 bg-white/95 p-8 shadow-lg backdrop-blur-sm',
									plan.isFeatured &&
										'transform shadow-xl ring-2 ring-orange-500 ring-offset-2'
								)}
							>
								<div className='mb-6'>
									<div className='mb-4 flex size-12 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500 text-3xl shadow-md'>
										{
											icons[
												plan.title as keyof typeof icons
											]
										}
									</div>

									<h3 className='mb-2 text-2xl font-bold text-gray-900'>
										{plan.title}
									</h3>

									<p className='mb-6 text-sm text-gray-600'>
										{plan.description}
									</p>

									<div className='mb-6'>
										<div className='flex items-baseline gap-1'>
											<span className='text-4xl font-bold text-gray-900'>
												{displayPrice}&#8381;
											</span>
											<span className='text-gray-500'>
												/ в месяц
											</span>
										</div>

										{isYearly ? (
											<div className='mt-1 text-sm text-gray-500'>
												{plan.yearlyPrice}&#8381; в год
											</div>
										) : (
											<div className='mt-1 text-sm text-gray-500'>
												Останавливайте и отменяйте
												подписку в любой момент
											</div>
										)}

										{isYearly && (
											<div className='mt-1 text-sm text-gray-500'>
												Оплата за весь год, экономия{' '}
												{calculateYearlyDiscount(
													plan.monthlyPrice,
													plan.yearlyPrice
												)}
												%
											</div>
										)}
									</div>

									<Button size='lg' className='w-full'>
										Выбрать тариф
									</Button>
								</div>

								<div className='space-y-4'>
									<h4 className='mb-4 font-semibold text-gray-900'>
										В тариф входят:
									</h4>

									{plan.features.map((feature, index) => (
										<div
											key={index}
											className='flex items-start gap-x-3'
										>
											<div className='flex size-5 items-center justify-center rounded-full bg-orange-500'>
												<CheckIcon className='size-3 text-white' />
											</div>
											<span className='text-sm text-gray-700'>
												{feature}
											</span>
										</div>
									))}
								</div>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}
