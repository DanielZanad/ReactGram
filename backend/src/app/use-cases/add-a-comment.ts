import { Injectable } from '@nestjs/common';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { PhotoComment } from '@app/entities/photo/PhotoComment';

interface AddCommentRequest {
  comment: PhotoComment;
  photoId: string;
}

interface AddCommentResponse {
  comment: PhotoComment;
}

@Injectable()
export class AddComment {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(request: AddCommentRequest): Promise<AddCommentResponse> {
    const { photoId, comment } = request;

    const photoComment = await this.photoRepository.comment(photoId, comment);

    if (!photoComment) return null;

    return {
      comment: photoComment,
    };
  }
}
