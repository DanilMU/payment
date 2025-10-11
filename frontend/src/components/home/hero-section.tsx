export function HeroSection() {
	return (
		<section className='px-6 py-16 text-center'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-8 flex items-center justify-center'>
					<div className='flex items-center space-x-2 rounded-full border px-4 py-1 text-sm text-gray-600'>
						<div className='size-2 rounded-full bg-orange-500' />
						<span>Тарифы</span>
					</div>
				</div>

				<h1 className='mb-6 text-5xl leading-[70px] font-bold text-gray-900 md:text-6xl'>
					Гибкие тарифные планы
					<br />
					для любых задач
				</h1>

				<p className='mx-auto mb-12 max-w-2xl text-xl text-gray-600'>
					Подберите тариф, который действительно подойдёт именно вам —
					будь то старт небольшой идеи или масштабный проект.
				</p>
			</div>
		</section>
	)
}
