import { Photo } from '@app/entities/photo/Photo';
import { PhotoComment } from '@app/entities/photo/PhotoComment';
import { photos as photoRaw } from '@prisma/client';

export class PrismaPhotosMapper {
  static toDomain(photoRaw: photoRaw) {
    const photoComments = [];

    photoRaw.comments.map((photoComment) =>
      photoComments.push(new PhotoComment(photoComment)),
    );

    return new Photo(
      {
        image: photoRaw.image,
        title: photoRaw.title,
        userId: photoRaw.userId,
        userName: photoRaw.userName,
        comments: photoComments,
        likes: photoRaw.likes,
        createdAt: photoRaw.createdAt,
        updatedAt: photoRaw.updatedAt,
      },
      photoRaw.id,
    );
  }
}
