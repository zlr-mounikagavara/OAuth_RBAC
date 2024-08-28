import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { GithubStrategy } from './strategy/github.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/users/prisma/prisma.service';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  providers: [AuthService, GithubStrategy,UsersService,PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
