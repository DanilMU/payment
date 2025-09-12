import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Request } from 'express'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get('@me')
	public async getMe(@Req() req: Request) {
		return req.user
	}
}
