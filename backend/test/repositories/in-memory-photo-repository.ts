import { Photo } from '@app/entities/photo/Photo';
import { PhotoRepository } from '@app/repositories/photo-repository';

export class InMemoryPhotoRepository implements PhotoRepository {
  public photos: Photo[] = [];

  async getAllPhotos(): Promise<Photo[]> {
    return this.photos;
  }
}
