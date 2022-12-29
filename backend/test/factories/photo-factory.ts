import { Photo, PhotoProps } from '@app/entities/photo/Photo';

type Override = Partial<PhotoProps>;

export function makePhoto(override: Override = {}) {
  return new Photo({
    userName: 'user-name',
    userId: 'user-id',
    image: 'image.png',
    title: 'title',
    ...override,
  });
}
