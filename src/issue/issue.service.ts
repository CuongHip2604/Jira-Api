import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Project from 'project/project.entity';
import { ProjectService } from 'project/project.service';
import { Repository } from 'typeorm';
import { UserService } from 'user/user.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';
import { IssueStatus } from './enum';
import Issue from './issue.entity';
import { max } from 'lodash';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UpdateStatusAndOrderDto } from './dto/update-status-order.dto';

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

  async getIssue(id: number): Promise<Issue> {
    const issue = await this.issueRepository.findOne({
      where: { id },
    });

    if (!issue) {
      throw new NotFoundException('This issue is not found');
    }

    return issue;
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
  ): Promise<Issue> {
    const issue = await this.getIssue(id);

    const { description, priority, title, type, userId, status } =
      updateIssueDto;

    issue.title !== title && (issue.title = title);
    issue.description !== description && (issue.description = description);
    issue.type !== type && (issue.type = type);
    issue.priority !== priority && (issue.priority = priority);
    issue.userId !== userId && (issue.userId = userId);
    issue.status !== status && (issue.status = status);
    return await this.issueRepository.save(issue);
  }

  async updateIssueStatus(
    body: UpdateStatusAndOrderDto,
    id: number,
  ): Promise<Issue> {
    const issue = await this.getIssue(id);

    const { status } = body;

    issue.status = status;

    return await this.issueRepository.save(issue);
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

    if (!issues.length) return 0;

    const orders = issues.map((issue) => issue.order);

    return max(orders) + 1;
  }
}
