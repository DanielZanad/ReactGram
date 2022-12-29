export interface PhotoCommentProps {
  comment: string;
  userId: string;
  userImage: string;
  userName: string;
}

export class PhotoComment {
  private props: PhotoCommentProps;

  constructor(props: PhotoCommentProps) {
    this.props = props;
  }

  public get comment(): string {
    return this.props.comment;
  }

  public set comment(comment: string) {
    this.props.comment = comment;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userImage(): string {
    return this.props.userImage;
  }

  public set userImage(userImage: string) {
    this.props.userImage = userImage;
  }

  public get userName(): string {
    return this.props.userName;
  }

  public set userName(userName: string) {
    this.props.userName = userName;
  }
}
