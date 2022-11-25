import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProjectCategory, ProjectStatus } from 'project/enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([
    ProjectCategory.BUSINESS,
    ProjectCategory.MARKETING,
    ProjectCategory.SOFTWARE,
  ])
  category: ProjectCategory;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([ProjectStatus.ACTIVE, ProjectStatus.INACTIVE])
  status: ProjectStatus;

  @ApiProperty()
  @IsOptional()
  userIds: number[];
}
