import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  issueId: number;
}
