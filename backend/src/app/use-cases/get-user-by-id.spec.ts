import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { GetUserById } from './get-user-by-id';
import { makeUser } from '@test/factories/photo-factory';

describe('Register user', () => {
  it('should be able o register an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserById = new GetUserById(userRepository);

    await userRepository.register(makeUser({ userId: 'user1' }));

    const { user } = await getUserById.execute({ userId: 'user1' });

    expect(userRepository.user).toHaveLength(1);

    expect(user).toEqual(userRepository.user[0]);
  });
});
