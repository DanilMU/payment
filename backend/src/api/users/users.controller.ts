import { Body, Controller, Get, Patch } from '@nestjs/common'
import { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import { updateAutoRenewalRequest } from './dto/update-auto-renewal.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@Protected()
	@Get('@me')
	public async getMe(@Authorized('id') id: string) {
		return await this.usersService.getMe(id)
	}

	@Protected()
	@Patch('@me/auto-renewal')
	public async updateAutoRenewal(
		@Authorized() user: User,
		@Body() dto: updateAutoRenewalRequest
	) {
		return await this.usersService.updateAutoRenewal(user, dto)
	}
}
