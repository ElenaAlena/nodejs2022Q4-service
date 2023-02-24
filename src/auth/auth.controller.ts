import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginResponse } from './loginResponseType';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.authService.signUp(body);
  }

  @Post('login')
  login(@Body() body: CreateUserDto): Promise<LoginResponse> {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<LoginResponse> {
    return this.authService.refresh(refreshToken);
  }
}
