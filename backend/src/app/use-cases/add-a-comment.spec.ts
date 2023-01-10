import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository';
import { makePhoto, makeUser } from '@test/factories/photo-factory';
import { AddComment } from './add-a-comment';
import { PhotoComment } from '@app/entities/photo/PhotoComment';

describe('Comment a photo', () => {
  it('should be able to comment a photo', async () => {
    const photoRepository = new InMemoryPhotoRepository();
    const addComment = new AddComment(photoRepository);

    const user = await makeUser({}, 'userId');
    const photo = await makePhoto({}, 'photoId');

    await photoRepository.register(photo);

    const photoComment = new PhotoComment({
      comment: 'some comment',
      userId: user.id,
      userImage: user.profileImage,
      userName: user.name,
    });

    const response = await addComment.execute({
      photoId: photo.id,
      comment: photoComment,
    });

    expect(response).toBeTruthy();
    expect(photoRepository.photos[0].comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ comment: 'some comment' }),
      ]),
    );
  });
});
