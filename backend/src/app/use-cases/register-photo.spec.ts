import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { RegisterPhoto } from './register-photo';
import { makePhoto } from '@test/factories/photo-factory';

describe('Register user', () => {
  it('should be able o register an user', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const registerPhoto = new RegisterPhoto(photoRepository);

    const { newPhoto } = await registerPhoto.execute(makePhoto());

    expect(photoRepository.users).toHaveLength(1);
    expect(photoRepository.users[0]).toEqual(newPhoto);
  });
});
