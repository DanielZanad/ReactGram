import { generatePasswordHash } from '@app/helpers/GenerateHash';
import { User } from './User';
import { PasswordHash } from './passwordHash';

describe('User', () => {
  it('should be able to create a new user', async () => {
    const passwordHash = new PasswordHash('321321fd');
    console.log(passwordHash.value);

    passwordHash.value = await generatePasswordHash(passwordHash.value);
    const user = new User({
      name: 'walter',
      email: 'walter@white.com',
      passwordHash: passwordHash,
      profileImage: 'someImage.png',
      createdAt: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
