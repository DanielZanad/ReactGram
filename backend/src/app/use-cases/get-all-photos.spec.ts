import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { GetAllPhotos } from './get-all-photos';
import { makePhoto } from '@test/factories/photo-factory';

describe('Get all photos', () => {
  it('should be able to get all photos', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const getAllPhotos = new GetAllPhotos(photoRepository);

    photoRepository.photos.push(makePhoto());

    const { photos } = await getAllPhotos.execute();

    expect(photos).toBeTruthy();
    expect(photos).toHaveLength(1);
  });
});
