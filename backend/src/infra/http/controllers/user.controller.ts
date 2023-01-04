import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { registerUserBody } from '../dtos/register-user-body';
import { RegisterUser } from '@app/use-cases/register-user';
import { LocalAuthGuard } from '@infra/auth/local-auth.guard';
import { AuthService } from '@infra/auth/auth.service';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';

@Controller('api/users')
export class UserController {
  constructor(
    private registerUser: RegisterUser,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: registerUserBody) {
    const { password, email, name } = body;

    const { user } = await this.registerUser.execute({
      name,
      email,
      password,
    });

    return {
      user,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
