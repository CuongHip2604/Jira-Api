import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { IssueModule } from './issue/issue.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserProjectModule } from './user-project/user-project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    IssueModule,
    ProjectModule,
    CommentModule,
    AuthModule,
    ConfigModule.forRoot(),
    UserProjectModule,
    UserModule,
  ],
})
export class AppModule {}
