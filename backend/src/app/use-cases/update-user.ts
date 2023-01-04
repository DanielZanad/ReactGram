import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { Password } from '@app/entities/user/password';
import { generatePasswordHash } from '@app/helpers/GenerateHash';

interface UpdateUserRequest {
  user: User;
  profileImage?: Express.Multer.File;
  name?: string;
  bio?: string;
  password?: string;
}

interface UpdateUserResponse {
  updatedUser: User;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { user, profileImage, name, bio, password } = request;

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordHash = await generatePasswordHash(password);
      user.passwordHash = new Password(passwordHash);
    }

    if (profileImage) {
      user.profileImage = profileImage.filename;
    }

    if (bio) {
      user.bio = bio;
    }

    const updatedUser = await this.userRepository.update(user);

    return { updatedUser };
  }
}
