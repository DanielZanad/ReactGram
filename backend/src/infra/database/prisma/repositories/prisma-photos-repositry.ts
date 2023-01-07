import { PhotoRepository } from '@app/repositories/photo-repository';
import { PrismaService } from '../prisma.service';
import { Photo } from '@app/entities/photo/Photo';
import { PrismaPhotosMapper } from '../mappers/prisma-photo-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPhotosRepository implements PhotoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(photoId: string): Promise<Photo | null> {
    const result = await this.prisma.photos.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!result) {
      return null;
    }

    const photo = PrismaPhotosMapper.toDomain(result);

    return photo;
  }

  async getUserPhotos(userId: string): Promise<Photo | Photo[]> {
    const result = await this.prisma.photos.findMany({
      where: {
        userId,
      },
    });

    const photo = result.map(PrismaPhotosMapper.toDomain);

    return photo;
  }

  async getAllPhotos(): Promise<Photo[]> {
    const result = await this.prisma.photos.findMany();

    const photos = result.map(PrismaPhotosMapper.toDomain);
    return photos;
  }
}
