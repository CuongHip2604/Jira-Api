import { UserDetailDto } from 'user/dto/user-detail.dto';
import Project from 'project/project.entity';

export class ProjectDetailDto {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  users: UserDetailDto[];

  constructor(data: Project) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    this.status = data.status;
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.users = data.userProjects.map((el) => new UserDetailDto(el.user));
  }
}
