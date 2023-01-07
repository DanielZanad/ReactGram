import { Photo } from '@app/entities/photo/Photo';

export class photoViewModel {
  static toHTTP(photo: Photo) {
    return {
      _id: photo.id,
      image: photo.image,
      title: photo.title,
      likes: photo.likes,
      comments: photo.comments.map((comment) => {
        return {
          comment: comment.comment,
          userName: comment.userName,
          userImage: comment.userImage,
          userId: comment.userId,
        };
      }),
      userId: photo.userId,
      userName: photo.userName,
      createdAt: photo.createdAt,
      updateAt: photo.updatedAt,
    };
  }
}
