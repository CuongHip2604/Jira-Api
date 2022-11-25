import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'tasks/enum/task-status.enum';

const allowedStatuses = [
  TaskStatus.TODO,
  TaskStatus.PENDING,
  TaskStatus.IN_PROGRESS,
  TaskStatus.CANCLE,
];

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn(allowedStatuses)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
