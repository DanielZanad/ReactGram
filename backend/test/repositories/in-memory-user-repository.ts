import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  async register(user: User) {
    this.user.push(user);
  }
}
