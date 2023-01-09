import { PhotoRepository } from '@app/repositories/photo-repository';
import { PrismaService } from '../prisma.service';
import { Photo } from '@app/entities/photo/Photo';
import { PrismaPhotosMapper } from '../mappers/prisma-photo-mapper';
import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/User';

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

  async like(photoId: string, userId: string): Promise<Photo | null> {
    const photo = await this.findById(photoId);
    if (!photo) {
      return null;
    }

    if (photo.likes.includes(userId)) return null;

    photo.addLikes(userId);

    const result = await this.prisma.photos.update({
      where: {
        id: photoId,
      },
      data: {
        likes: photo.likes,
      },
    });

    console.log('result', result);

    return PrismaPhotosMapper.toDomain(result);
  }

  async update(photoId: string, title?: string): Promise<Photo | null> {
    const photo = await this.findById(photoId);

    if (!photo) {
      return null;
    }

    if (title) {
      photo.title = title;
    }

    const result = await this.prisma.photos.update({
      where: {
        id: photoId,
      },
      data: {
        title: title,
        updatedAt: new Date(),
      },
    });

    return PrismaPhotosMapper.toDomain(result);
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
