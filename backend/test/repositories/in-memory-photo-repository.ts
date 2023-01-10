import { Photo } from '@app/entities/photo/Photo';
import { User } from '@app/entities/user/User';
import { PhotoRepository } from '@app/repositories/photo-repository';

export class InMemoryPhotoRepository implements PhotoRepository {
  public photos: Photo[] = [];
  public users: User[] = [];

  async findById(photoId: string): Promise<Photo | null> {
    const photo = await this.photos.find((item) => item.id === photoId);

    if (!photo) return null;

    return photo;
  }

  async update(photoId: string, title?: string): Promise<Photo | null> {
    const photo = await this.findById(photoId);

    if (!photo) return null;

    if (title) {
      this.photos.map((item) => {
        if (item.id === photoId) {
          item.title = title;
        }
      });
    }

    return this.photos[0];
  }

  async delete(photoId: string, userId: string): Promise<Photo | null> {
    let photoDeleted = null;
    this.photos.map((item) => {
      if (item.userId === userId && item.id === photoId) {
        photoDeleted = new Photo(item, item.id);
        this.photos.pop();
      }
    });

    return photoDeleted;
  }

  async like(photoId: string, userId: string): Promise<Photo | null> {
    const photo = await this.findById(photoId);

    if (!photo) return null;

    if (photo.likes.includes(userId)) return null;

    this.photos.map((item) => {
      if (item.id === photo.id) {
        photo.addLikes(userId);
      }
    });

    return photo;
  }

  async search(query: string): Promise<Photo[] | null> {
    const photo = this.photos.filter((item) => {
      if (item.title.search(new RegExp(query, 'i')) !== -1) {
        return item;
      }
    });

    if (!photo) {
      return null;
    }

    return photo;
  }

  async getUserPhotos(userId: string): Promise<Photo | Photo[]> {
    const result = await this.photos.filter((photo) => photo.userId === userId);

    if (result.length == 1) {
      return result[0];
    }

    return result;
  }

  async register(photo: Photo) {
    this.photos.push(photo);
    return this.photos[0];
  }

  async getAllPhotos(): Promise<Photo[]> {
    return this.photos;
  }
}
