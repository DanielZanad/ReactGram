import { User } from '@app/entities/user/User';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      bio: user.bio,
      profileImage: user.profileImage,
    };
  }
}
