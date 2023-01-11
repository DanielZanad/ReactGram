import { PhotoComment } from '@app/entities/photo/PhotoComment';

export class photoCommentViewModel {
  static toHTTP(photoComment: PhotoComment) {
    return {
      comment: photoComment.comment,
      userName: photoComment.userName,
      userImage: photoComment.userImage,
      userId: photoComment.userId,
    };
  }
}
