import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'auth/user.entity';
import Comment from 'comment/comment.entity';
import Project from 'project/project.entity';
import { IssuePriority, IssueStatus, IssueType } from './enum';

@Entity()
class Issue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  type: IssueType;

  @Column('varchar')
  status: IssueStatus;

  @Column('varchar')
  priority: IssuePriority;

  @Column('integer')
  order: number;

  @Column('text', { nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('integer')
  reporterId: number;

  @ManyToOne(() => Project, (project) => project.issues)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column('integer')
  projectId: number;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.issues)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('integer')
  userId: number;
}

export default Issue;
