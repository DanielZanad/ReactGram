import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { RegisterUser } from './register-user';

describe('Register user', () => {
  it('should be able o register an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUser = new RegisterUser(userRepository);

    const { user } = await registerUser.execute({
      email: 'example@email.com',
      name: 'Example Name',
      password: '3x4mpl3P4ssw0rd',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });
});
