import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { RegisterPhoto } from './register-photo';
import { makePhoto } from '@test/factories/photo-factory';

describe('Register photo', () => {
  it('should be able o register a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const registerPhoto = new RegisterPhoto(photoRepository);

    const { newPhoto } = await registerPhoto.execute(makePhoto());

    expect(photoRepository.photos).toHaveLength(1);
    expect(photoRepository.photos[0]).toEqual(newPhoto);
  });
});
