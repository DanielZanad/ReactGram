import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { DeletePhoto } from './delete-photo';
import { makePhoto } from '@test/factories/photo-factory';

describe('Delete photo', () => {
  it('should be able o Delete a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const deletePhoto = new DeletePhoto(photoRepository);

    photoRepository.register(makePhoto({}, 'photo1'));
    const { deletedPhoto } = await deletePhoto.execute({
      photoId: 'photo1',
    });

    expect(photoRepository.photos).toHaveLength(0);
    expect(deletedPhoto.id).toEqual('photo1');
  });

  it('should not be able o Delete a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const deletePhoto = new DeletePhoto(photoRepository);

    photoRepository.register(makePhoto({}, 'photo2'));
    const { deletedPhoto } = await deletePhoto.execute({
      photoId: 'photo1',
    });

    expect(photoRepository.photos).toHaveLength(1);
    expect(deletedPhoto).toBeNull();
  });
});
