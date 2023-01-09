import { Photo } from '@app/entities/photo/Photo';
import { User } from '@app/entities/user/User';

export abstract class PhotoRepository {
  abstract getAllPhotos(): Promise<Array<Photo | null>>;
  abstract findById(photoId: string): Promise<Photo | null>;
  abstract getUserPhotos(userId: string): Promise<Array<Photo> | Photo>;
  abstract update(photoId: string, title?: string): Promise<Photo | null>;
  abstract like(photoId: string, userId: string): Promise<Photo | null>;
}
