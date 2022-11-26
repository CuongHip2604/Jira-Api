import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import Project from 'project/project.entity';
import { ProjectModule } from 'project/project.module';
import { UserModule } from 'user/user.module';
import { IssueController } from './issue.controller';
import Issue from './issue.entity';
import { IssueService } from './issue.service';

@Module({
  providers: [IssueService],
  controllers: [IssueController],
  imports: [
    TypeOrmModule.forFeature([Issue, Project]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ProjectModule,
    UserModule,
  ],
  exports: [IssueService],
})
export class IssueModule {}
