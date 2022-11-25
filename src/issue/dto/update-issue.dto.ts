import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IssuePriority, IssueStatus, IssueType } from 'issue/enum';

export class UpdateIssueDto {
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
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
