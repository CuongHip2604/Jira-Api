import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { email, password, name } = authSignUpDto;

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.name = name;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authSignInDto: AuthSignInDto) {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Email is not exists');
    }

    if (!(await this.validatePassword(password, user.salt, user.password))) {
      throw new BadRequestException('Password is incorrect');
    }

    const payload = { email, id: user.id, name: user.name };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, salt: string, passwordDB: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash === passwordDB;
  }
}
