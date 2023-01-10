import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { DeletePhoto } from './delete-photo';
import { makePhoto, makeUser } from '@test/factories/photo-factory';

describe('Delete photo', () => {
  it('should be able o Delete a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const deletePhoto = new DeletePhoto(photoRepository);

    const user = await makeUser({}, 'userId');

    photoRepository.register(makePhoto({ userId: 'userId' }, 'photo1'));
    photoRepository.users.push(makeUser({ userId: 'userId' }, 'photo1'));

    const { deletedPhoto } = await deletePhoto.execute({
      photoId: 'photo1',
      userId: user.id,
    });

    expect(photoRepository.photos).toHaveLength(0);
    expect(deletedPhoto.id).toEqual('photo1');
  });

  it('should not be able o Delete a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const deletePhoto = new DeletePhoto(photoRepository);

    const user = await makeUser({}, 'userId');
    photoRepository.register(makePhoto({ userId: 'userId' }, 'photo2'));
    const { deletedPhoto } = await deletePhoto.execute({
      photoId: 'photo1',
      userId: user.id,
    });

    expect(photoRepository.photos).toHaveLength(1);
    expect(deletedPhoto).toBeNull();
  });
});
