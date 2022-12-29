import { PasswordHash } from './passwordHash';

export interface UserProps {
  name: string;
  email: string;
  passwordHash: PasswordHash;
  createdAt: Date;
  updatedAt?: Date | null;
  profileImage: string;
  bio?: string | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id;
    this.props = props;
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

  public get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  public set passwordHash(passwordHash: PasswordHash) {
    this.props.passwordHash = passwordHash;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
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
