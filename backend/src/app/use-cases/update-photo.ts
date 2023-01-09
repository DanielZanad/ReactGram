import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Photo } from '@app/entities/photo/Photo';

interface UpdatePhotoRequest {
  photoId: string;
  title: string;
}

interface UpdatePhotoResponse {
  updatedPhoto: Photo;
}

@Injectable()
export class UpdatePhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: UpdatePhotoRequest): Promise<UpdatePhotoResponse> {
    const { photoId, title } = request;

    const updatedPhoto = await this.photoRepository.update(photoId, title);

    return { updatedPhoto };
  }
}
