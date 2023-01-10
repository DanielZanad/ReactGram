import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '@app/repositories/photo-repository';

interface LikePhotoRequest {
  userId: string;
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
    const { photoId, userId } = request;

    const photo = await this.photoRepository.like(photoId, userId);

    if (!photo) return null;

    return {
      photoId: photo.id,
      userId: photo.userId,
      message: 'A foto foi curtida!',
    };
  }
}
