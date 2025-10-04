
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface AuthWrapperProps {
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
	children: ReactNode
}

export function AuthWrapper({
	title,
	description,
	bottomText,
	bottomTextLink,
	bottomLinkHref,
	children
}: AuthWrapperProps) {
	return (
		<div className='flex min-h-screen'>
			<div className='relative hidden overflow-hidden bg-gradient-to-br from-[#FFF4EC] via-[#FFEBDD] to-[#FFDAB3] lg:flex lg:w-1/2'>
				<div className='absolute inset-0 bg-gradient-to-br from-[#FFF4EC]/90 via-[#FFEBDD]/90 to-[#FFDAB3]/90' />

				<div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-12'>
					<Image
						src='/images/logo.svg'
						alt='Auth'
						width={500}
						height={500}
					/>
				</div>
			</div>

			<div className='flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-md'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl font-bold'>{title}</h1>
						<p className='text-muted-foreground mt-2'>
							{description}
						</p>
					</div>

                    <div className='my-5 p-0'>{children}</div>

                    {bottomText && bottomTextLink && bottomLinkHref && (
						<p className='text-muted-foreground text-center text-[15px]'>
							{bottomText}{' '}
							<Link
								href={bottomLinkHref}
								className='font-medium text-orange-500'
							>
								{bottomTextLink}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
