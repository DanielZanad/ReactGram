import { Replace } from 'src/app/helpers/Replace';
import { PhotoComment } from './PhotoComment';

export interface PhotoProps {
  userName: string;
  userId: string;
  image: string;
  title: string;
  likes: Array<string>;
  comments: Array<PhotoComment>;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Photo {
  private _id: string;
  private props: PhotoProps;

  constructor(
    props: Replace<
      PhotoProps,
      {
        createdAt?: Date;
        likes?: Array<string>;
        comments?: Array<PhotoComment>;
      }
    >,
    id?: string,
  ) {
    this._id = id;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      likes: props.likes ?? [],
      comments: props.comments ?? [],
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userName(): string {
    return this.props.userName;
  }

  public set userName(userName: string) {
    this.props.userName = userName;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get image(): string {
    return this.props.image;
  }

  public set image(image: string) {
    this.props.image = image;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get likes(): Array<string> {
    return this.props.likes;
  }

  public addLikes(userId: string) {
    this.props.likes.push(userId);
  }

  public get comments(): Array<PhotoComment> {
    return this.props.comments;
  }

  public addComment(photoComment: PhotoComment) {
    this.props.comments.push(photoComment);
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
}
