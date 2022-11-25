import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { IssueStatus } from 'issue/enum';

export class UpdateStatusAndOrderDto {
  // @IsNotEmpty()
  // @IsInt()
  // newOrder: number;

  // @IsNotEmpty()
  // @IsInt()
  // oldOrder: number;

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
}
