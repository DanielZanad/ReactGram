export class Password {
  private password: string;

  public get value(): string {
    return this.password;
  }

  public set value(password: string) {
    this.password = password;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 6 && password.length <= 230;
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password);

    if (!isPasswordLengthValid) {
      throw new Error('Password length error!');
    }

    if (password.match(/^[0-9]+$/) != null) {
      throw new Error('Password only contains numbers!');
    }

    this.password = password;
  }
}
