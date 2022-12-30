import { Body, Controller, Post } from '@nestjs/common';
import { registerUserBody } from '../dtos/register-user-body';
import { RegisterUser } from '@app/use-cases/register-user';

@Controller('api/users')
export class UserController {
  constructor(private registerUser: RegisterUser) {}

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
}
