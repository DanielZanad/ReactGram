import { Photo } from '@app/entities/photo/Photo';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { Password } from '@app/entities/user/password';
import { generatePasswordHash } from '@app/helpers/GenerateHash';
import { PhotoRepository } from '@app/repositories/photo-repository';

interface RegisterPhotoRequest {
  title: string;
  image: string;
  userName: string;
  userId: string;
}

interface RegisterPhotoResponse {
  newPhoto: Photo;
}

@Injectable()
export class RegisterPhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: RegisterPhotoRequest): Promise<RegisterPhotoResponse> {
    const { image, title, userId, userName } = request;

    const photo = new Photo({
      image,
      title,
      userId,
      userName,
    });

    const newPhoto = await this.photoRepository.register(photo);

    return { newPhoto };
  }
}
