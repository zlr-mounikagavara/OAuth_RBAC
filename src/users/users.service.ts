import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByGitHubId(githubId: string) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
}
