'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { faqs } from '@/data'

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<section className='bg-gray-50 py-20'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-12 text-center'>
					<h2 className='mb-4 text-3xl font-bold text-gray-900'>
						Часто задаваемые вопросы
					</h2>
					<p className='text-gray-600'>
						Всё, что нужно знать о наших тарифах
					</p>
				</div>

				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className='rounded-2xl bg-white shadow-sm'
						>
							<button
								onClick={() =>
									setOpenIndex(
										openIndex === index ? null : index
									)
								}
								className='flex w-full cursor-pointer items-center justify-between rounded-2xl px-8 py-6 text-left transition-colors hover:bg-gray-50'
							>
								<span className='flex w-full cursor-pointer items-center justify-between rounded-2xl px-8 py-6 text-left transition-colors hover:bg-gray-50'>
									{faq.question}
								</span>
								<ChevronDownIcon
									className={cn(
										'size-5 text-gray-500',
										openIndex === index && 'rotate-180'
									)}
								/>
							</button>

                            {openIndex === index && (
								<div className='px-8 pb-6'>
									<p className='text-gray-600'>
										{faq.answer}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
