import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from 'user-project/user-project.entity';
import { ProjectController } from './project.controller';
import Project from './project.entity';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([Project, UserProject]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule, ProjectService],
})
export class ProjectModule {}
