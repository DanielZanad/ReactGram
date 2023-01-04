import { User } from '@app/entities/user/User';

export abstract class UserRepository {
  abstract register(user: User): Promise<void>;
  abstract findById(userId: string): Promise<User | null>;
  abstract emailExists(userEmail: string): Promise<User | null>;
  abstract update(user: User): Promise<User | null>;
}
