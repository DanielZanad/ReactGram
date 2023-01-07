import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { GetUserPhotos } from './get-user-photos';
import { makePhoto, makeUser } from '@test/factories/photo-factory';

describe('Get user photos', () => {
  it('should be able to get all user photos', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const getUserPhotos = new GetUserPhotos(photoRepository);

    await photoRepository.register(
      makePhoto({ title: 'image 1', userId: 'user1' }),
    );
    await photoRepository.register(
      makePhoto({ title: 'image 2', userId: 'user1' }),
    );
    await photoRepository.users.push(makeUser({ userId: 'user1' }));

    const { photo } = await getUserPhotos.execute({ userId: 'user1' });

    expect(photo).toHaveLength(2);
    expect(photo).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user1' }),
        expect.objectContaining({ userId: 'user1' }),
      ]),
    );
  });
});
