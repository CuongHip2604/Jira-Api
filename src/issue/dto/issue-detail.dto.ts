import { CommentDetailDto } from 'comment/dto/comment-detail.dto';
import Issue from 'issue/issue.entity';
import { UserDetailDto } from 'user/dto/user-detail.dto';

export class IssueDetailDto {
  id: number;
  title: string;
  type: string;
  status: string;
  priority: string;
  order: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  reporterId: number;
  projectId: number;
  user: UserDetailDto;
  comments: CommentDetailDto[];

  constructor(issue: Issue) {
    this.id = issue.id;
    this.title = issue.title;
    this.type = issue.type;
    this.status = issue.status;
    this.priority = issue.priority;
    this.order = issue.order;
    this.description = issue.description;
    this.createdAt = issue.createdAt;
    this.updatedAt = issue.updatedAt;
    this.reporterId = issue.reporterId;
    this.projectId = issue.projectId;
    this.user = new UserDetailDto(issue.user);
    this.comments = issue.comments.map(
      (comment) => new CommentDetailDto(comment),
    );
  }
}
