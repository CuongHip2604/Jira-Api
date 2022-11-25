import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  // getTasksWithFilter(filter: GetTaskFilterDto): Task[] {
  //   const { search, status } = filter;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   if (search && status)
  //     [
  //       (tasks = tasks.filter(
  //         (task) =>
  //           task.status === status &&
  //           (task.title.includes(search) || task.description.includes(search)),
  //       )),
  //     ];
  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task with ID not found');
    }
    return task;
  }
  async createTask(createTask: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = createTask.title;
    task.description = createTask.description;
    task.prioity = createTask.priority;
    task.status = createTask.status;

    return await this.taskRepository.save(task);
  }
  // deleteTask(id: string): any {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return this.tasks;
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   task.updateAt = new Date();
  //   return task;
  // }
  // updateTask(id: string, updateTask: UpdateTaskDto) {
  //   let task = this.getTaskById(id);
  //   task = { ...task, ...updateTask };
  //   task.updateAt = new Date();
  //   return task;
  // }
}
