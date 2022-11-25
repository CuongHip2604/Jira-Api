import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'auth/get-user.decorator';
import { User } from 'auth/user.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UpdateStatusAndOrderDto } from './dto/update-status-order.dto';
import Issue from './issue.entity';
import { IssueService } from './issue.service';

@ApiTags('Issue')
@ApiBearerAuth()
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getIssues(@Query() filter: FilterIssueDto): Promise<Issue[]> {
    return this.issueService.getIssues(filter);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getIssue(@Param('id') id: string): Promise<Issue> {
    return this.issueService.getIssue(Number(id));
  }

  @Post('')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createIssue(
    @Body() createIssueDto: CreateIssueDto,
    @GetUser() user: User,
  ): Promise<Issue> {
    return this.issueService.createIssue(createIssueDto, user.id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateIssue(
    @Body() updateIssueDto: UpdateIssueDto,
    @Param('id') id: string,
  ): Promise<Issue> {
    return this.issueService.updateIssue(updateIssueDto, Number(id));
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateIssueStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusAndOrderDto,
  ): Promise<Issue> {
    return this.issueService.updateIssueStatus(body, Number(id));
  }
}
