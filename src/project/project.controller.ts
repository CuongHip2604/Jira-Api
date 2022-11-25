import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'auth/get-user.decorator';
import { User } from 'auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailDto } from './dto/project-detail.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './enum';
import Project from './project.entity';
import { ProjectService } from './project.service';

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @UseGuards(AuthGuard())
  getProjects(): Promise<ProjectDetailDto[]> {
    return this.projectService.getProjects();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getProjectById(@Param('id') id: string): Promise<ProjectDetailDto> {
    return this.projectService.getProject(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.updateProject(
      Number(id),
      updateProjectDto,
      user.id,
    );
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateProjectStatus(
    @Param('id') id: string,
    @Body('status') status: ProjectStatus,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.updateProjectStatus(Number(id), status, user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProject(@Param('id') id: string, @GetUser() user: User) {
    return this.projectService.deleteProject(Number(id), user.id);
  }
}
