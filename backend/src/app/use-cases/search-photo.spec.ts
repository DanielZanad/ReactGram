import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { SearchPhoto } from './search-photo';
import { makePhoto } from '@test/factories/photo-factory';

describe('Search photo', () => {
  it('should be able to search for a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const searchPhoto = new SearchPhoto(photoRepository);

    photoRepository.register(makePhoto({}, 'photo1'));
    photoRepository.register(makePhoto({}, 'photo2'));

    const { photos } = await searchPhoto.execute({
      query: 'title',
    });

    expect(photos).toBeTruthy();
    expect(photos).toHaveLength(2);
    expect(photos).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'title' })]),
    );
  });

  it('should not be able to search for a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const searchPhoto = new SearchPhoto(photoRepository);

    photoRepository.register(makePhoto());

    const { photos } = await searchPhoto.execute({
      query: 'aaa',
    });

    expect(photos).toHaveLength(0);
  });
});
