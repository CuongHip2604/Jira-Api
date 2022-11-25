import { TaskStatus } from 'tasks/enum/task-status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  status: TaskStatus;
}
