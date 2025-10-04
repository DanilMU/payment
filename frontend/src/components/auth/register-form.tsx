import { AuthWrapper } from './auth-wrapper'

export function RegisterForm() {
	return (
		<AuthWrapper
			title='Регистрация'
			description='Заполните форму, чтобы создать аккаунт'
            bottomText='Уже есть аккаунт?'
            bottomTextLink='Войти'
            bottomLinkHref='/auth/login'
            
		>Content</AuthWrapper>
	)
}
