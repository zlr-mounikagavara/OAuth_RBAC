import { IsString, IsEmail, IsOptional, IsArray, IsBoolean, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'Username of the user',
    example: 'name',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'OAuth provider used for authentication',
    example: 'github',
  })
  @IsString()
  provider: string;

  @ApiProperty({
    description: 'URL of the user\'s avatar',
    example: 'https://example.com/avatar.png',
  })
  @IsString()
  avatar: string;



  @ApiProperty({
    description: 'user invitation',
    example: 'true',
  })
  isInvited: boolean;


  @ApiProperty({
    description: 'user token',
    example: '4575678976789',
  })
  inviteToken: string;

  @ApiProperty({ 
    description: 'team Ids',
    example: ['457r-56789e-76789r'], })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teams?: string[] | null;

  @ApiProperty({
    name: 'role',
    description: 'Role for each user',
    example: 'USER',
  })
  @IsEnum(Role)
  role: Role;
}
