import { makePhoto } from '@test/factories/photo-factory';
import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { UpdatePhoto } from './update-photo';

describe('Update a photo', () => {
  it('should be able to update a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const updatePhoto = new UpdatePhoto(photoRepository);

    const photo = makePhoto({ userId: 'userId' }, 'photoId1');

    await photoRepository.register(photo);

    const { updatedPhoto } = await updatePhoto.execute({
      photoId: photo.id,
      title: 'newTitle',
    });

    expect(photoRepository.photos[0].id).toEqual(updatedPhoto.id);
    expect(photoRepository.photos[0].title).toEqual(updatedPhoto.title);
  });

  it('should not be able to update a photo with an invalid id', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const updatePhoto = new UpdatePhoto(photoRepository);

    const photo = makePhoto({ userId: 'userId' }, 'photoId1');

    await photoRepository.register(photo);

    const { updatedPhoto } = await updatePhoto.execute({
      photoId: 'photoId2',
      title: 'newTitle',
    });

    expect(updatedPhoto).toBeNull();
  });
});
