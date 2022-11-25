import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'auth/get-user.decorator';
import { User } from 'auth/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @Get('/info')
  @UseGuards(AuthGuard())
  getUserInfo(@GetUser() user: User): UserDetailDto {
    return new UserDetailDto(user);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard())
  getUsers(): Promise<UserDetailDto[]> {
    return this.userService.getUsers();
  }

  @ApiBearerAuth()
  @Put('/:id')
  @UseGuards(AuthGuard())
  updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserDetailDto> {
    return this.userService.updateUser(Number(id), updateUserDto, user.id);
  }

  @ApiBearerAuth()
  @Get('/projects')
  @UseGuards(AuthGuard())
  getProjectsByUser(@GetUser() user: User): Promise<any> {
    return this.userService.getProjectsByUser(user.id);
  }
}
