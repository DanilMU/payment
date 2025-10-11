import Image from 'next/image'
import Link from 'next/link'

import { companies } from '@/data'

export function TrustedBySection() {
	return (
		<section className='bg-gray-50 py-16'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 text-center'>
					<h2 className='mb-4 text-3xl font-bold text-gray-900'>
						Нам доверяют лидеры
					</h2>
					<p className='text-gray-600'>
						Присоединяйтесь к тысячам компаний, которые уже
						используют нашу платформу
					</p>
				</div>

				<div className='grid grid-cols-2 items-center gap-20 md:grid-cols-3 lg:grid-cols-6'>
					{companies.map((company, index) => (
						<Link
							key={index}
							href={company.website}
							target='_blank'
						>
							<div className='flex h-[100px] w-[150px] items-center justify-center'>
								<Image
									src={`/images/companies/${company.logo}`}
									alt={company.name}
									width={150}
									height={150}
									className='object-contain'
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
