import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PasswordHash } from '@app/entities/user/passwordHash';
import { generatePasswordHash } from '@app/helpers/GenerateHash';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

@Injectable()
export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { email, name, password } = request;

    const passwordHash = new PasswordHash(password);

    passwordHash.value = await generatePasswordHash(passwordHash.value);

    const user = new User({
      name,
      email,
      passwordHash,
      profileImage: '',
    });

    await this.userRepository.register(user);

    return { user };
  }
}
