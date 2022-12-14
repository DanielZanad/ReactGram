import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { UpdateUser } from './update-user';
import { makeUser } from '@test/factories/photo-factory';

describe('Update an user', () => {
  it('should be able to update an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(userRepository);

    const user = makeUser({}, 'userId');
    const userToUpdate = makeUser({}, 'userId');

    await userRepository.register(user);

    const { updatedUser } = await updateUser.execute({
      user: userToUpdate,
      bio: 'Modified bio',
      name: 'Modified name',
      password: 'Modified password',
    });

    expect(userRepository.users[0].bio).toEqual(updatedUser.bio);
    expect(userRepository.users[0].name).toEqual(updatedUser.name);
    expect(userRepository.users[0].passwordHash.value).toEqual(
      updatedUser.passwordHash.value,
    );
  });
});
