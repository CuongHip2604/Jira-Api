import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'auth/get-user.decorator';
import { User } from 'auth/user.entity';
import { ResponseInterceptor } from 'interceptors/response.interceptor';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FilterIssueDto } from './dto/filter-issue.dto';
import { IssueDetailDto } from './dto/issue-detail.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import Issue from './issue.entity';
import { IssueService } from './issue.service';

@ApiTags('Issue')
@ApiBearerAuth()
@UseInterceptors(new ResponseInterceptor())
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
  getIssue(@Param('id') id: string): Promise<IssueDetailDto> {
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
  ): Promise<IssueDetailDto> {
    return this.issueService.updateIssue(updateIssueDto, Number(id));
  }
}
