import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Issue from 'issue/issue.entity';
import { UserProject } from 'user-project/user-project.entity';
import is from 'utils/validation';
import { ProjectCategory, ProjectStatus } from './enum';

@Entity()
class Project extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    url: is.url(),
    category: [is.required(), is.oneOf(Object.values(ProjectCategory))],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string | null;

  @Column()
  category: ProjectCategory;

  @Column()
  status: ProjectStatus;

  @Column('integer')
  ownerId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];
}

export default Project;
