import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import {
	InitPaymentRequestBillingPeriod,
	InitPaymentRequestProvider,
	PlanResponse
} from '@/api/types'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import { Form } from '../ui/form'

import { PaymentMethods } from './payment-methods'
import { useRouter } from 'next/navigation'
import { useInitPaymentMutation } from '@/api/hooks'

export const initPaymentSchema = z.object({
	planId: z.string(),
	provider: z.enum(InitPaymentRequestProvider),
	billingPeriod: z.enum(InitPaymentRequestBillingPeriod)
})

export type InitPaymentFormValues = z.infer<typeof initPaymentSchema>

interface PaymentModalProps {
	isOpen: boolean
	onClose: () => void
	plan: PlanResponse
	price: number
	billingPeriod: InitPaymentRequestBillingPeriod
}

export function PaymentModal({
	isOpen,
	onClose,
	plan,
	price,
	billingPeriod
}: PaymentModalProps) {
	const router = useRouter()

	const { mutate, isPending } = useInitPaymentMutation({
		onSuccess(data) {
			if (data.url) {
				router.push(data.url)
			}
		}
	})

	const form = useForm<InitPaymentFormValues>({
		resolver: zodResolver(initPaymentSchema),
		defaultValues: {
			planId: plan.id,
			provider: InitPaymentRequestProvider.YOOKASSA,
			billingPeriod
		}
	})

	const { isValid } = form.formState

	const onSubmit = (values: InitPaymentFormValues) => {
		mutate(values)
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Оплата</DialogTitle>
					<DialogDescription>
						Тариф "{plan.title}" - {price}&#8381; /{' '}
						{billingPeriod ===
						InitPaymentRequestBillingPeriod.MONTHLY
							? 'месяц'
							: 'год'}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<PaymentMethods control={form.control} />

						<div className='flex gap-x-3 pt-4'>
							<Button
								type='button'
								variant='outline'
								size='lg'
								className='flex-1'
								onClick={onClose}
							>
								Отмена
							</Button>
							<Button
								type='submit'
								size='lg'
								className='flex-1'
								disabled={!isValid || isPending}
							>
								Перейти к оплате
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
