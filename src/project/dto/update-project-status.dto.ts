import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ProjectStatus } from 'project/enum';

export class UpdateProjectStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([ProjectStatus.ACTIVE, ProjectStatus.INACTIVE])
  status: ProjectStatus;
}
