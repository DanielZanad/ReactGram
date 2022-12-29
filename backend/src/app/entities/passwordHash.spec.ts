import { PasswordHash } from './passwordHash';

describe('User passwordHash', () => {
  it('should be able to create a user passwordHash', () => {
    const passwordHash = new PasswordHash('12345abc');
    expect(passwordHash).toBeTruthy();
  });

  it('should not be able to create a passwordHash with a only digits password', () => {
    expect(() => new PasswordHash('12345')).toThrow();
  });

  it('should not be able to create a passwordHash with less than 5 characters', () => {
    expect(() => new PasswordHash('1abc')).toThrow();
  });

  it('should not be able to create a passwordHash with more than 20 characters', () => {
    expect(() => new PasswordHash('a'.repeat(21))).toThrow();
  });
});
