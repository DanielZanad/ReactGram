import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Photo } from '@app/entities/photo/Photo';

interface DeletePhotoRequest {
  photoId: string;
  userId: string;
}

interface DeletePhotoResponse {
  deletedPhoto: Photo;
}

@Injectable()
export class DeletePhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: DeletePhotoRequest): Promise<DeletePhotoResponse> {
    const { photoId, userId } = request;

    const deletedPhoto = await this.photoRepository.delete(photoId, userId);

    return { deletedPhoto };
  }
}
