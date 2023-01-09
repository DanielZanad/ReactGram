import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { LikePhoto } from './like-a-photo';
import { makePhoto, makeUser } from '@test/factories/photo-factory';

describe('Like a photo', () => {
  it('should be able to like a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const likePhoto = new LikePhoto(photoRepository);

    const user = await makeUser({}, 'userId');
    const photo = await makePhoto({ userId: 'userId' }, 'photoId');

    await photoRepository.register(photo);

    const response = await likePhoto.execute({
      photoId: photo.id,
      user,
    });

    expect(response).toBeTruthy();
    expect(photoRepository.photos[0].likes).toEqual(
      expect.arrayContaining([user.id]),
    );
  });
});
