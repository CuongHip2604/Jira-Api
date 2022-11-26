import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'interceptors/response.interceptor';
import Comment from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@ApiBearerAuth()
@UseInterceptors(new ResponseInterceptor())
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<Comment> {
    return this.commentService.updateComment(updateCommentDto, Number(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.deleteComment(Number(id));
  }
}
