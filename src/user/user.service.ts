import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'auth/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<UserDetailDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => new UserDetailDto(user));
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, userId: number) {
    const user = await this.getUserById(id);

    this.checkingAllowUpdate(id, userId);

    const { name, avatarUrl } = updateUserDto;

    name !== user.name && (user.name = name);

    avatarUrl && avatarUrl !== user.avatarUrl && (user.avatarUrl = avatarUrl);

    const res = await this.userRepository.save(user);

    return new UserDetailDto(res);
  }

  async getProjectsByUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userProjects', 'userProjects.project'],
    });

    return user.userProjects.map((el) => el.project);
  }

  private checkingAllowUpdate(id: number, userId: number): boolean {
    if (id !== userId) {
      throw new NotImplementedException(
        'You do not have permission to edit this user',
      );
    }

    return true;
  }

  private async getUserById(id: number): Promise<User> {
    const project = await this.userRepository.findOne({
      select: ['id', 'avatarUrl', 'email', 'createdAt', 'updatedAt', 'name'],
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('This user is not found');
    }

    return project;
  }
}
