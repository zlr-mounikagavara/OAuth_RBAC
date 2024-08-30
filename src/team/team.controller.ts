import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teamService.findOne(String(id));
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teamService.remove(String(id));
  }
}
