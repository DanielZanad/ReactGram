import { User } from './User';
import { PasswordHash } from './passwordHash';

describe('User', () => {
  it('should be able to create a new user', () => {
    const user = new User({
      name: 'walter',
      email: 'walter@white.com',
      passwordHash: new PasswordHash('12345abc'),
      profileImage: 'someImage.png',
      createdAt: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
