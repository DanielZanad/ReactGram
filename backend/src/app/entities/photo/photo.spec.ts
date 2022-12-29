import { makePhoto } from '@test/factories/photo-factory';
import { PhotoComment } from './PhotoComment';

describe('Photo', () => {
  it('should be able to create a new photo', () => {
    const photo = makePhoto();

    expect(photo).toBeTruthy();
  });

  it('should be able to add a like to a photo', () => {
    const photo = makePhoto();

    photo.addLikes('user-id');

    expect(photo.likes).toHaveLength(1);
  });

  it('should be able to add a comment to a photo', () => {
    const photo = makePhoto();

    photo.addComment(
      new PhotoComment({
        comment: 'comment',
        userId: 'user-id',
        userImage: 'user-image',
        userName: 'user-name',
      }),
    );

    expect(photo.comments).toHaveLength(1);
  });
});
