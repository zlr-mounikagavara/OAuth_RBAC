import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { Prisma, Role, user } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<user> {
    try {
      const { teams, ...userData } = createUserDto;

     

      const userCount = await this.prisma.user.count();
      const role = userCount === 0 ? Role.ADMIN : Role.USER;

      const user = await this.prisma.user.create({
        data: {
          ...userData,
          role: role,

        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('A user with this email already exists');
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { teams, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
      }
    });
  }

  async remove(id: string): Promise<user> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }


  async login(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

  
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async promoteToAdmin(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === Role.ADMIN) {
      throw new ConflictException('User is already an admin');
    }

    return this.prisma.user.update({
      where: { id },
      data: { role: Role.ADMIN },
    });
  }
}