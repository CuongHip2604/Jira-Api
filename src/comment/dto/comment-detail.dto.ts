import Comment from 'comment/comment.entity';
import { UserDetailDto } from 'user/dto/user-detail.dto';

export class CommentDetailDto {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  issueId: number;
  user: UserDetailDto;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.body = comment.body;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.issueId = comment.issueId;
    this.user = new UserDetailDto(comment.user);
  }
}
