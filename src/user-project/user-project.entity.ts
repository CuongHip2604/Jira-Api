import { User } from 'auth/user.entity';
import Project from 'project/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
