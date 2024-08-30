import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Prisma, team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<team> {

    const data: Prisma.teamCreateInput = {
      ...createTeamDto
    };

    return this.prisma.team.create({ data });
  }

  async findAll(): Promise<team[]> {
    return this.prisma.team.findMany();
  }

  async findOne(id: string): Promise<team> {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }


  async remove(id: string): Promise<team> {
    const existingTeam = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam) {
      throw new NotFoundException('Team not found');
    }

    return this.prisma.team.delete({
      where: { id },
    });
  }
}
