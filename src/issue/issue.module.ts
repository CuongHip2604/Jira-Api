import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Issue from './issue.entity';

@Module({
  providers: [IssueService],
  controllers: [IssueController],
  imports: [TypeOrmModule.forFeature([Issue])],
})
export class IssueModule {}
