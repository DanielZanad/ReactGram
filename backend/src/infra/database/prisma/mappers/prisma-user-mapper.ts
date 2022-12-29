import { User } from '@app/entities/user/User';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.passwordHash.value,
      profileImage: user.profileImage,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      v: 0,
    };
  }
}
