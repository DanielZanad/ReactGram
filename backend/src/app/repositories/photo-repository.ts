import { Photo } from '@app/entities/photo/Photo';

export abstract class PhotoRepository {
  abstract getAllPhotos(): Promise<Array<Photo>>;
}
