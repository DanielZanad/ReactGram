import { generatePasswordHash } from '@app/helpers/GenerateHash';
import { User } from './User';
import { Password } from './password';

describe('User', () => {
  it('should be able to create a new user', async () => {
    const password = new Password('321321fd');

    password.value = await generatePasswordHash(password.value);
    const user = new User({
      name: 'walter',
      email: 'walter@white.com',
      passwordHash: password,
      profileImage: 'someImage.png',
      createdAt: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
