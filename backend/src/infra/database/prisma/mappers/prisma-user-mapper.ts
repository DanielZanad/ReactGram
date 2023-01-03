import { users as UserRaw } from '@prisma/client';
import { User } from '@app/entities/user/User';
import { Password } from '@app/entities/user/password';

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

  static toDomain(user: UserRaw): User {
    return new User(
      {
        name: user.name,
        email: user.email,
        passwordHash: new Password(user.password),
        profileImage: user.profileImage,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
