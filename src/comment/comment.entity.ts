import { User } from 'auth/user.entity';
import Issue from 'issue/issue.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDellete: boolean;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('integer')
  userId: number;

  @ManyToOne(() => Issue, (issue) => issue.comments)
  @JoinColumn({ name: 'issueId' })
  issue: Issue;

  @Column('integer')
  issueId: number;
}

export default Comment;
