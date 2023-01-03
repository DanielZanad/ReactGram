import { Photo, PhotoProps } from '@app/entities/photo/Photo';
import { User } from '@app/entities/user/User';
import { Password } from '@app/entities/user/password';

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

export function makeUser(override: Override = {}) {
  return new User(
    {
      email: 'example@email.com',
      name: 'Example Name',
      passwordHash: new Password('3x4mpl3P4ssw0rd'),
      profileImage: 'example.png',
      bio: 'Some bio',
      ...override,
    },
    override.userId,
  );
}
