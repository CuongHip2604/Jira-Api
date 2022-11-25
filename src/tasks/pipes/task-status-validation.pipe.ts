import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'tasks/enum/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.TODO,
    TaskStatus.PENDING,
    TaskStatus.IN_PROGRESS,
    TaskStatus.CANCLE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isValidStatus(status: any) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
