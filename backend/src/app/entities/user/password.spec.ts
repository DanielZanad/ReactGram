import { Password } from './password';

describe('User passwordHash', () => {
  it('should be able to create a user passwordHash', () => {
    const password = new Password('12345abc');
    expect(password).toBeTruthy();
  });

  it('should not be able to create a passwordHash with a only digits password', () => {
    expect(() => new Password('12345')).toThrow();
  });

  it('should not be able to create a passwordHash with less than 6 characters', () => {
    expect(() => new Password('1abcd')).toThrow();
  });
});
