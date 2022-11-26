import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Project from 'project/project.entity';
import { ProjectService } from 'project/project.service';
import { Repository } from 'typeorm';
import { UserService } from 'user/user.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';
import { IssueDetailDto } from './dto/issue-detail.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueStatus } from './enum';
import Issue from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,

    @InjectRepository(Project)
    private projectepository: Repository<Project>,

    private projectService: ProjectService,

    private userService: UserService,
  ) {}

  async getIssues(filters?: FilterIssueDto): Promise<Issue[]> {
    const { projectId } = filters;

    if (projectId) {
      return await this.getIssuesByProjectId(projectId);
    }

    return await this.issueRepository.find();
  }

  async getIssue(id: number): Promise<IssueDetailDto> {
    const issue = await this.getIssueById(id);
    return new IssueDetailDto(issue);
  }

  async createIssue(
    createIssueDto: CreateIssueDto,
    reporterId: number,
  ): Promise<Issue> {
    const { title, type, description, priority, projectId, userId } =
      createIssueDto;

    await Promise.all([
      this.projectService.getProjectById(projectId),
      this.userService.getUserById(userId),
    ]);

    const issue = new Issue();
    issue.title = title;
    issue.type = type;
    issue.status = IssueStatus.TODO;
    issue.description = description;
    issue.priority = priority;
    issue.reporterId = reporterId;
    issue.projectId = projectId;
    issue.userId = userId;
    issue.order = await this.getOrder();

    return await this.issueRepository.save(issue);
  }

  async updateIssue(
    updateIssueDto: UpdateIssueDto,
    id: number,
  ): Promise<IssueDetailDto> {
    const issue = await this.getIssueById(id);

    const { userId } = updateIssueDto;

    if (userId) {
      await this.userService.getUserById(userId);
    }

    Object.assign(issue, updateIssueDto);
    return new IssueDetailDto(await this.issueRepository.save(issue));
  }

  private async getIssuesByProjectId(projectId: number): Promise<Issue[]> {
    const project = await this.projectepository.findOne({
      where: { id: projectId, isDeleted: false },
      select: ['issues'],
      relations: ['issues'],
    });

    if (!project) {
      throw new NotFoundException('This project is not found');
    }

    return project.issues;
  }

  private async getOrder() {
    const issues = await this.issueRepository.find();

    const orders = issues.map((issue) => issue.order);

    if (orders.length > 0) {
      return Math.min(...orders) - 1;
    }
    return 1;
  }

  async getIssueById(id: number) {
    const issue = await this.issueRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });

    if (!issue) {
      throw new NotFoundException('This issue is not found');
    }

    return issue;
  }
}
