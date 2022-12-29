import { genSalt, hash } from 'bcryptjs';

export class PasswordHash {
  private passwordHash: string;

  public get value(): string {
    return this.passwordHash;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 5 && password.length <= 18;
  }

  private async generatePasswordHash(password: string) {
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);
    return passwordHash;
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password);

    if (!isPasswordLengthValid) {
      throw new Error('Password length error!');
    }

    if (password.match(/^[0-9]+$/) != null) {
      throw new Error('Password only contains numbers!');
    }

    this.generatePasswordHash(password).then(
      (res) => (this.passwordHash = res),
    );
  }
}
