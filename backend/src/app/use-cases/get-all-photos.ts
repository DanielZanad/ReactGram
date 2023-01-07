import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Injectable } from '@nestjs/common';

interface GetAllPhotosResponse {
  photos: Array<Photo>;
}

@Injectable()
export class GetAllPhotos {
  constructor(private photoRepository: PhotoRepository) {}

  async execute() {
    const photos = await this.photoRepository.getAllPhotos();

    return { photos };
  }
}
