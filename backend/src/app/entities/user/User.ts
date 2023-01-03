import { Replace } from 'src/app/helpers/Replace';
import { Password } from './password';
import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: string;
  passwordHash: Password;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string;
  bio?: string | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get passwordHash(): Password {
    return this.props.passwordHash;
  }

  public set passwordHash(passwordHash: Password) {
    this.props.passwordHash = passwordHash;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | null) {
    this.props.updatedAt = updatedAt;
  }

  public get profileImage(): string {
    return this.props.profileImage;
  }

  public set profileImage(profileImage: string) {
    this.props.profileImage = profileImage;
  }

  public get bio(): string {
    return this.props.bio;
  }

  public set bio(bio: string) {
    this.props.bio = bio;
  }
}
