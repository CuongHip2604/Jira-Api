import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ProjectCategory, ProjectStatus } from 'project/enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([
    ProjectCategory.BUSINESS,
    ProjectCategory.MARKETING,
    ProjectCategory.SOFTWARE,
  ])
  category: ProjectCategory;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn([ProjectStatus.ACTIVE, ProjectStatus.INACTIVE])
  status: ProjectStatus;

  @ApiProperty()
  @IsOptional()
  userIds: number[];
}
