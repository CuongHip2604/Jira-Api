import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IssuePriority, IssueType } from 'issue/enum';

export class CreateIssueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([IssueType.STORY, IssueType.TASK])
  type: IssueType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([
    IssuePriority.LOWEST,
    IssuePriority.LOW,
    IssuePriority.MEDIUM,
    IssuePriority.HIGH,
    IssuePriority.HIGHEST,
  ])
  priority: IssuePriority;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
