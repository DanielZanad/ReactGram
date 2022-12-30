import { genSalt, hash } from 'bcryptjs';

export class PasswordHash {
  private passwordHash: string;

  public get value(): string {
    return this.passwordHash;
  }

  public set value(password: string) {
    this.passwordHash = password;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 5 && password.length <= 18;
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password);

    if (!isPasswordLengthValid) {
      throw new Error('Password length error!');
    }

    if (password.match(/^[0-9]+$/) != null) {
      throw new Error('Password only contains numbers!');
    }

    this.passwordHash = password;
  }
}
