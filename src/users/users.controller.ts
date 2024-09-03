import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Role } from '../auth/enums/roles.enum';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard('github'))
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN) 
  findAll(@Request() req) {
    console.log(req.user, "Authenticated user");  
    return this.usersService.findAll();
  }
}
