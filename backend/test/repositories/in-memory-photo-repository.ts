import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';

export class InMemoryPhotoRepository implements PhotoRepository {
  public photos: Photo[] = [];
  async findById(photoId: string): Promise<Photo | null> {
    const photo = await this.photos.find((item) => item.id === photoId);

    if (!photo) return null;

    return photo;
  }

  async register(photo: Photo) {
    this.photos.push(photo);
  }

  async getAllPhotos(): Promise<Photo[]> {
    return this.photos;
  }
}
