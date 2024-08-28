import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { PrismaService } from './users/prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './auth/strategy/github.strategy';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, // Makes the module available globally
  }),
  AuthModule,
  UsersModule,PassportModule],
  controllers: [AppController,AuthController],
  providers: [AppService,AuthService, UsersService, PrismaService, GithubStrategy],
})
export class AppModule {}
