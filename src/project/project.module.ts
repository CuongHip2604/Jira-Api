import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import Project from './project.entity';
import { ProjectService } from './project.service';
import { PassportModule } from '@nestjs/passport';
import { User } from 'auth/user.entity';
import { UserProject } from 'user-project/user-project.entity';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([Project, User, UserProject]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
})
export class ProjectModule {}
