import Image from 'next/image'
import Link from 'next/link'

import { companyLinks, productLinks, supportLinks } from '@/data'

export function SiteFooter() {
	return (
		<footer className='bg-gray-900 py-16 text-white'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-8 md:grid-cols-4'>
					<div>
						<div className='mb-2 flex items-center gap-x-2'>
							<Image
								src='/images/logo.svg'
								alt='CheckoutPlus'
								width={150}
								height={150}
							/>

							{/*<span className='text-xl font-semibold text-white'>
								CheckoutPlus
							</span>*/}
						</div>
						<p className='mb-6 text-gray-400'>
							CheckoutPlus - место, где всё просто работает
						</p>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Продукт</h3>

						<ul className='space-y-2 text-gray-400'>
							{productLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-white'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>О компании</h3>

						<ul className='space-y-2 text-gray-400'>
							{companyLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-white'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Поддержка</h3>

						<ul className='space-y-2 text-gray-400'>
							{supportLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-white'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
