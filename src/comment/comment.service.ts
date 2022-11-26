import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueService } from 'issue/issue.service';
import { Repository } from 'typeorm';
import { UserService } from 'user/user.service';
import Comment from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private issueService: IssueService,
    private userService: UserService,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { issueId, userId, body } = createCommentDto;
    await Promise.all([
      this.issueService.getIssue(issueId),
      this.userService.getUserById(userId),
    ]);

    const comment = new Comment();
    comment.body = body;
    comment.issueId = issueId;
    comment.userId = userId;

    return await this.commentRepository.save(comment);
  }

  async updateComment(
    updateCommentDto: UpdateCommentDto,
    id: number,
  ): Promise<Comment> {
    const comment = await this.getCommentById(id);

    Object.assign(comment, updateCommentDto);

    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number) {
    const comment = await this.getCommentById(id);

    comment.isDellete = true;

    return await this.commentRepository.save(comment);
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
        isDellete: false,
      },
    });

    if (!comment) {
      throw new NotFoundException('This comment is not found');
    }

    return comment;
  }
}
