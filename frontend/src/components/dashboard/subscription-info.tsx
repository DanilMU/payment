'use client'

import { CreditCardIcon, CrownIcon, Zap, ZapIcon } from 'lucide-react'
import Link from 'next/link'

import { useGetMeQuery, useToggleAutoRenewalMutation } from '@/api/hooks'
import { SubscriptionResponseStatus } from '@/api/types'

import { formatDate } from '@/lib/utils'

import { Button } from '../ui/button'

import { SubscriptionStatusBadge } from './badges'
import { SubscriptionCard } from './subscription-card'
import { Skeleton } from '../ui/skeleton'

export function SubscriptionInfo() {
	const { data: user, isLoading, refetch } = useGetMeQuery()

	const { mutate } = useToggleAutoRenewalMutation({
		onSuccess() {
			refetch()
		}
	})

	if (isLoading) return <SubscriptionInfoSkeleton />

	if (!user?.subscription) {
		return (
			<SubscriptionCard
				icon={Zap}
				iconBg='bg-gray-100'
				iconColor='text-gray-400'
				title='У вас нет активной подписки'
				description='Оформите подписку, чтобы получить доступ ко всем функциям и возможностям платформы'
				action={
					<Button variant='gradient' className='w-full' asChild>
						<Link href='/'>
							<CrownIcon />
							Выбрать тариф
						</Link>
					</Button>
				}
			/>
		)
	}

	if (
		user?.subscription.status === SubscriptionResponseStatus.PENDING_PAYMENT
	) {
		return (
			<SubscriptionCard
				icon={CreditCardIcon}
				iconBg='bg-yellow-100'
				iconColor='text-yellow-600'
				title='Ожидается оплата'
				description={
					<>
						Вы выбрали тариф{' '}
						<strong>{user.subscription.plan.title}</strong>, но
						оплата ещё не подтверждена.
					</>
				}
			/>
		)
	}

	if (user?.subscription.status === SubscriptionResponseStatus.EXPIRED) {
		return (
			<SubscriptionCard
				icon={ZapIcon}
				iconBg='bg-yellow-100'
				iconColor='text-yellow-600'
				title='Ваша подписка истекла'
				description='Чтобы продолжить пользоваться всеми функциями, продлите текущий тариф или выберите новый.'
				action={
					<Button variant='gradient' className='w-full' asChild>
						<Link href='/'>
							<CrownIcon />
							Продлить подписку
						</Link>
					</Button>
				}
			/>
		)
	}

	return (
		<SubscriptionCard
			action={
				<Button
					variant='outline'
					onClick={() =>
						mutate({ isAutoRenewal: !user.isAutoRenewal })
					}
					className='w-full'
				>
					{user.isAutoRenewal ? 'Отключить' : 'Включить'}
				</Button>
			}
		>
			<div className='flex items-center justify-between'>
				<span className='text-gray-600'>Тариф:</span>
				<span className='font-semibold'>
					{user.subscription.plan.title}
				</span>
			</div>

			<div className='flex items-center justify-between'>
				<span className='text-gray-600'>Статус:</span>
				<SubscriptionStatusBadge status={user.subscription.status} />
			</div>

			<div className='flex items-center justify-between'>
				<span className='text-gray-600'>Следующий платеж:</span>
				<span className='font-semibold'>
					{formatDate(user.subscription.endDate)}
				</span>
			</div>

			<div className='border-t pt-4'>
				<div className='flex items-center gap-2'>
					<CreditCardIcon className='size4 text-gray-500' />
					<span className='text-sm font-medium'>Автоплатёж</span>
				</div>
				<p className='mt-2 text-xs text-gray-500'>
					{user.isAutoRenewal
						? 'Платежи будут списываться автоматически'
						: 'Вы будете получать уведомления о необходимости оплаты'}
				</p>
			</div>
		</SubscriptionCard>
	)
}

function SubscriptionInfoSkeleton() {
	return (
		<SubscriptionCard>
			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-12' />
				<Skeleton className='h-4 w-20' />
			</div>

			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-14' />
				<Skeleton className='h-5 w-16 rounded-full' />
			</div>

			<div className='flex items-center justify-between'>
				<Skeleton className='h-4 w-32' />
				<Skeleton className='h-4 w-20' />
			</div>

			<div className='border-t pt-4'>
				<div className='flex items-center gap-2'>
					<Skeleton className='h-4 w-4' />
					<Skeleton className='h-4 w-20' />
				</div>
				<Skeleton className='mt-2 h-3 w-64' />
			</div>

			<Skeleton className='h-10 w-full rounded-lg' />
		</SubscriptionCard>
	)
}
