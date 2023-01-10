import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { SearchPhoto } from './search-photo';
import { makePhoto } from '@test/factories/photo-factory';

describe('Search photo', () => {
  it('should be able to search for a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const searchPhoto = new SearchPhoto(photoRepository);

    photoRepository.register(makePhoto());

    const { photo } = await searchPhoto.execute({
      query: 'title',
    });

    expect(photo).toBeTruthy();
    expect(photo.title).toEqual('title');
  });

  it('should not be able to search for a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const searchPhoto = new SearchPhoto(photoRepository);

    photoRepository.register(makePhoto());

    const { photo } = await searchPhoto.execute({
      query: 'aaa',
    });

    expect(photo).toBeNull();
  });
});
