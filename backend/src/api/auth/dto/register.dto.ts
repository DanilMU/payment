import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@IsString()
	public name: string

	@IsNotEmpty()
	@IsEmail()
	public email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	public password: string
}
