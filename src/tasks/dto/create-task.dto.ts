import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskPriority } from 'tasks/enum/task-priority.enum';
import { TaskStatus } from 'tasks/enum/task-status.enum';

const allowedPriories = [
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGHT,
];

const allowedStatuses = [
  TaskStatus.TODO,
  TaskStatus.PENDING,
  TaskStatus.IN_PROGRESS,
  TaskStatus.CANCLE,
];

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(allowedPriories)
  priority: TaskPriority;

  @IsNotEmpty()
  @IsString()
  @IsIn(allowedStatuses)
  status: TaskStatus;
}
