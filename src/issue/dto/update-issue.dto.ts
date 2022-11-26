import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IssuePriority, IssueStatus, IssueType } from 'issue/enum';

export class UpdateIssueDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn([IssueType.STORY, IssueType.TASK])
  type: IssueType;

  @ApiProperty()
  @IsOptional()
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
  @IsNotEmpty()
  @IsString()
  @IsIn([
    IssueStatus.TODO,
    IssueStatus.IN_PROGRESS,
    IssueStatus.REVIEWING,
    IssueStatus.REVIEWED,
    IssueStatus.DONE,
    IssueStatus.PENDING,
    IssueStatus.CANCEL,
  ])
  status: IssueStatus;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  order: number;
}
