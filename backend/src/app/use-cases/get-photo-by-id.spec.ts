import { makePhoto } from '@test/factories/photo-factory';
import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { GetPhotoById } from './get-photo-by-id';

describe('Get photo by id', () => {
  it('should be able to photo photo with an existing id', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const getPhotoByID = new GetPhotoById(photoRepository);

    await photoRepository.register(makePhoto({}, 'photo-id1'));

    const { photo } = await getPhotoByID.execute({ photoId: 'photo-id1' });

    expect(photoRepository.photos).toHaveLength(1);

    expect(photo).toEqual(photoRepository.photos[0]);
  });

  it('should not be able to get photo with an incorrect id', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const getPhotoByID = new GetPhotoById(photoRepository);

    await photoRepository.register(makePhoto({}, 'photo-id1'));

    const { photo } = await getPhotoByID.execute({ photoId: 'photo-id2' });

    expect(photo).toBeNull();
  });
});
