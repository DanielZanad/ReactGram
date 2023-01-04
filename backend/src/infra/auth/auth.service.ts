import { compare } from 'bcryptjs';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateUser(userEmail: string, password: string) {
    const user = await this.userRepository.emailExists(userEmail);

    if (!user) {
      return null;
    }

    if (await compare(password, user.passwordHash.value)) {
      return user;
    }
  }

  async login(user: any) {
    const payload = { id: user._id };
    return {
      access_token: sign(payload, jwtConstants.secret, { expiresIn: '60s' }),
    };
  }
}
