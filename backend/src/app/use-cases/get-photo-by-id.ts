import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Injectable } from '@nestjs/common';

interface GetPhotoByIdRequest {
  photoId: string;
}

interface GetPhotoByIdResponse {
  photo: Photo;
}

@Injectable()
export class GetPhotoById {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: GetPhotoByIdRequest): Promise<GetPhotoByIdResponse> {
    const { photoId } = request;

    const photo = await this.photoRepository.findById(photoId);

    return { photo };
  }
}
