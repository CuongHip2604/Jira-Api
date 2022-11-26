import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'issue/issue.module';
import { UserModule } from 'user/user.module';
import { CommentController } from './comment.controller';
import Comment from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    IssueModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class CommentModule {}
