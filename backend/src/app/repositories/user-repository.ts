import { User } from '@app/entities/user/User';

export abstract class UserRepository {
  abstract register(user: User): Promise<void>;
}
