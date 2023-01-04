import { compare } from 'bcryptjs';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { User } from '@app/entities/user/User';
import { UserViewModel } from '@infra/http/view-models/user-view-model';

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

  async login(user: User) {
    const payload = UserViewModel.toHTTP(user);
    return {
      _id: user.id,
      profileImage: user.profileImage,
      token: sign(payload, jwtConstants.secret, { expiresIn: '60s' }),
    };
  }
}
