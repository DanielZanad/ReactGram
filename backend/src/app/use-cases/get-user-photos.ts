import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Injectable } from '@nestjs/common';

interface GetUserPhotosRequest {
  userId: string;
}

interface GetUserPhotosResponse {
  photo: Photo | Array<Photo>;
}

@Injectable()
export class GetUserPhotos {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: GetUserPhotosRequest): Promise<GetUserPhotosResponse> {
    const { userId } = request;

    const photo = await this.photoRepository.getUserPhotos(userId);

    return { photo };
  }
}
