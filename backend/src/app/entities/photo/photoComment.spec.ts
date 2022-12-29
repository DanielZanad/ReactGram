import { PhotoComment } from './PhotoComment';

describe('Photo comment', () => {
  test('should be able to create a photoComment', () => {
    const photoComment = new PhotoComment({
      comment: 'comment',
      userId: 'user-id',
      userImage: 'user-image',
      userName: 'user-name',
    });

    expect(photoComment).toBeTruthy();
  });
});
