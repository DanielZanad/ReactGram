import { Password } from './password';

describe('User passwordHash', () => {
  it('should be able to create a user passwordHash', () => {
    const password = new Password('12345abc');
    expect(password).toBeTruthy();
  });

  it('should not be able to create a passwordHash with a only digits password', () => {
    expect(() => new Password('12345')).toThrow();
  });

  it('should not be able to create a passwordHash with less than 5 characters', () => {
    expect(() => new Password('1abc')).toThrow();
  });

  it('should not be able to create a passwordHash with more than 20 characters', () => {
    expect(() => new Password('a'.repeat(21))).toThrow();
  });
});
