import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'interceptors/response.interceptor';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { User } from './user.entity';

@ApiTags('Auth')
@UseInterceptors(new ResponseInterceptor())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto): Promise<User> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInDto);
  }
}
