import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { Injectable } from '@nestjs/common';

interface SearchPhotoRequest {
  query: string;
}

interface SearchPhotoResponse {
  photo: Photo;
}

@Injectable()
export class SearchPhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: SearchPhotoRequest): Promise<SearchPhotoResponse> {
    const { query } = request;

    const photo = await this.photoRepository.search(query);

    return {
      photo,
    };
  }
}
