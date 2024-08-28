import { Role } from '@prisma/client';
import { IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  provider: string;

  @IsString()
  avatar: string;

  @IsEnum(Role)
  role: Role;
}
