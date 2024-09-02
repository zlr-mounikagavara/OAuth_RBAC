import { IsString, IsOptional, IsNotEmpty, IsDateString, IsInt, IsUrl, ValidateNested, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CreateTeamDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of the organization',
    example: 'Zelar',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    name: 'status',
    description: 'Status of the organization',
    example: 'active',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    name: 'created_at',
    description: 'Creation date of the organization',
    example: new Date().toISOString(),
  })
  @IsDateString()
  @IsOptional()
  created_at?: Date;

  @ApiProperty({
    name: 'modified_at',
    description: 'Last modification date of the organization',
    example: new Date().toISOString(),
  })
  @IsDateString()
  @IsOptional()
  modified_at?: Date;

  @ApiProperty({
    name: 'description',
    description: 'Description of the organization',
    example: 'This is an example description.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: 'teamUrl',
    description: 'URL of the team',
    example: 'https://www.example.com',
  })
  @IsUrl()
  @IsOptional()
  teamUrl?: string;

  @ApiProperty({
    name: 'contact',
    description: 'Contact number of the team',
    example: 1234567890,
  })
  @IsInt()
  @IsOptional()
  contact?: string;
  
 
}
