import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Photo } from '@app/entities/photo/Photo';
import { User } from '@app/entities/user/User';

interface LikePhotoRequest {
  user: User;
  photoId: string;
}

interface LikePhotoResponse {
  photoId: string;
  userId: string;
  message: string;
}

@Injectable()
export class LikePhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: LikePhotoRequest): Promise<LikePhotoResponse> {
    const { photoId, user } = request;

    const photo = await this.photoRepository.like(photoId, user);

    return {
      photoId: photo.id,
      userId: photo.userId,
      message: 'A foto foi curtida!',
    };
  }
}
