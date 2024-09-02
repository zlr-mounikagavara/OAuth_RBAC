import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { Role } from '@prisma/client';
import { PrismaService } from 'src/users/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    let user = await this.usersService.findOneByGitHubId(profile.githubId);

    if (!user) {
      // If the user doesn't exist, create a new user with a default role
      user = await this.prisma.user.create({
        data: {
          githubId: profile.githubId,
          username: profile.username,
          email: profile.email,
          avatar: profile.avatar,
          role: Role.USER,
        },
      });
    }

    return user;
  }
}
