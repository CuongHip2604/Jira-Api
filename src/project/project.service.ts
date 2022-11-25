import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'auth/user.entity';
import { Repository } from 'typeorm';
import { UserProject } from 'user-project/user-project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailDto } from './dto/project-detail.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './enum';
import Project from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserProject)
    private userProjectRepository: Repository<UserProject>,
  ) {}

  async getProjects(): Promise<ProjectDetailDto[]> {
    const projects = await this.projectRepository.find({
      select: [
        'id',
        'category',
        'description',
        'userProjects',
        'ownerId',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: { isDeleted: false },
      relations: ['userProjects', 'userProjects.user'],
    });

    return projects.map((el) => new ProjectDetailDto(el));
  }

  async getProject(id: number): Promise<ProjectDetailDto> {
    const project = await this.projectRepository.findOne({
      select: [
        'id',
        'category',
        'description',
        'userProjects',
        'ownerId',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: { id, isDeleted: false },
      relations: ['userProjects', 'userProjects.user'],
    });

    if (!project) {
      throw new NotFoundException('Project is not found');
    }

    return new ProjectDetailDto(project);
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const { name, description, category, status } = createProjectDto;
    let { userIds } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.category = category;
    project.ownerId = user.id;
    project.status = status;

    const data = [];
    const res = await this.projectRepository.save(project);

    if (!userIds) {
      userIds = [];
      userIds.push(user.id);
    }

    for (let index = 0; index < userIds.length; index++) {
      const userId = userIds[index];
      const payload = new UserProject();
      payload.userId = userId;
      payload.projectId = res.id;
      data.push(payload);
    }

    await this.userProjectRepository.save(data);

    return res;
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
    userId: number,
  ): Promise<Project> {
    const project = await this.getProjectById(id);

    this.checkingAllowUpdate(project.ownerId, userId);

    const { name, description, category, status } = updateProjectDto;

    project.name !== name && (project.name = name);
    project.category !== category && (project.category = category);
    project.description !== description && (project.description = description);
    project.status !== status && (project.status = status);

    const res = await this.projectRepository.save(project);

    return res;
  }

  async updateProjectStatus(
    id: number,
    status: ProjectStatus,
    userId: number,
  ): Promise<Project> {
    const project = await this.getProjectById(id);

    this.checkingAllowUpdate(project.ownerId, userId);

    project.status = status;

    const res = await this.projectRepository.save(project);

    return res;
  }

  async deleteProject(id: number, userId: number): Promise<Project> {
    const project = await this.getProjectById(id);

    this.checkingAllowUpdate(project.ownerId, userId);

    project.isDeleted = true;

    const res = await this.projectRepository.save(project);

    return res;
  }

  private checkingAllowUpdate(ownerId: number, userId: number): boolean {
    if (ownerId !== userId) {
      throw new NotImplementedException(
        'You do not have permission to edit this project',
      );
    }

    return true;
  }

  private async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      select: [
        'id',
        'category',
        'description',
        'userProjects',
        'ownerId',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: { id, isDeleted: false },
      relations: ['userProjects', 'userProjects.user'],
    });

    if (!project) {
      throw new NotFoundException('Project is not found');
    }

    return project;
  }
}
