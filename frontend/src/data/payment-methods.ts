import { BitcoinIcon, CreditCardIcon, GlobeIcon, StarIcon } from 'lucide-react'

import { InitPaymentRequestProvider } from '@/api/types'

import { PaymentMethod } from '@/types'

export const paymentMethods: PaymentMethod[] = [
	{
		id: InitPaymentRequestProvider.YOOKASSA,
		name: 'Карты РФ',
		description: 'Оплата картами российских банков',
		icon: CreditCardIcon,
		bg: 'bg-blue-50',
		textColor: 'text-blue-600'
	},
	{
		id: InitPaymentRequestProvider.STRIPE,
		name: 'Международные карты',
		description: 'Visa, Mastercard, American Express и другие',
		icon: GlobeIcon,
		bg: 'bg-purple-50',
		textColor: 'text-purple-600'
	},
	{
		id: InitPaymentRequestProvider.CRYPTOPAY,
		name: 'Криптовалюта',
		description: 'Bitcoin, Ethereum, USDT и другие',
		icon: BitcoinIcon,
		bg: 'bg-amber-50',
		textColor: 'text-amber-600'
	}
]
