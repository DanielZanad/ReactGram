import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async update(user: User): Promise<User | null> {
    const userExits = await this.users.find((item) => item.id === user.id);

    if (!userExits) return null;

    this.users.map((item) => {
      if (item.id === 'userId') {
        item.name = user.name;
        item.email = user.email;
        item.passwordHash = user.passwordHash;
        item.profileImage = user.profileImage;
        item.bio = user.bio;
        item.updatedAt = user.updatedAt;
      }
    });

    return this.users[0];
  }

  async emailExists(userEmail: string): Promise<User | null> {
    const user = await this.users.find((item) => item.email === userEmail);

    if (!user) return null;

    return user;
  }
  async findById(userId: string): Promise<User | null> {
    const user = await this.users.find((item) => item.id === userId);

    if (!user) return null;

    return user;
  }

  async register(user: User) {
    this.users.push(user);
  }
}
