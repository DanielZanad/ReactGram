import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  async emailExists(userEmail: string): Promise<User | null> {
    const user = await this.user.find((item) => item.email === userEmail);

    if (!user) return null;

    return user;
  }
  async findById(userId: string): Promise<User | null> {
    const user = await this.user.find((item) => item.id === userId);

    if (!user) return null;

    return user;
  }

  async register(user: User) {
    this.user.push(user);
  }
}
