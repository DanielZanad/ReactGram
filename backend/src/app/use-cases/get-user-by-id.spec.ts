import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { GetUserById } from './get-user-by-id';
import { makeUser } from '@test/factories/photo-factory';

describe('Get user by id', () => {
  it('should be able to get an user with an existing id', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserById = new GetUserById(userRepository);

    await userRepository.register(makeUser({ userId: 'user1' }, 'user1'));

    const { user } = await getUserById.execute({ userId: 'user1' });

    expect(userRepository.users).toHaveLength(1);

    expect(user).toEqual(userRepository.users[0]);
  });

  it('should not be able to get an user with an incorrect id', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserById = new GetUserById(userRepository);

    await userRepository.register(makeUser({}, 'user1'));

    const { user } = await getUserById.execute({ userId: 'user2' });

    expect(user).toBeNull();
  });
});
