import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { photoViewModel } from '../view-models/photo-view-model';
import { GetPhotoById } from '@app/use-cases/get-photo-by-id';
import { GetUserPhotos } from '@app/use-cases/get-user-photos';
import { UpdatePhoto } from '@app/use-cases/update-photo';
import { updatePhotoBody, updatePhotoParam } from '../dtos/update-photo';
import { LikePhotoParam } from '../dtos/like-a-photo';
import { LikePhoto } from '@app/use-cases/like-a-photo';

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
    private getUserPhotos: GetUserPhotos,
    private updatePhoto: UpdatePhoto,
    private likePhoto: LikePhoto,
  ) {}

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  async userPhotos(@Param() params) {
    const { photo } = await this.getUserPhotos.execute({ userId: params.id });

    if (Array.isArray(photo)) {
      return photo.map(photoViewModel.toHTTP);
    }

    return photoViewModel.toHTTP(photo);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async allPhotos() {
    const { photos } = await this.getAllPhotos.execute();

    return photos.map(photoViewModel.toHTTP);
  }

  @Put('/like/:id')
  @UseGuards(JwtAuthGuard)
  async like(@Request() req, @Param() params: LikePhotoParam) {
    const { photo } = await this.getPhotoById.execute({
      photoId: params.id,
    });

    if (!photo) {
      throw new HttpException('Foto não encontrada!', HttpStatus.NOT_FOUND);
    }

    const response = await this.likePhoto.execute({
      photoId: photo.id,
      userId: req.user._id,
    });

    if (!response) {
      throw new HttpException(
        'Você já curtiu esta foto.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { ...response };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async photoById(@Param() params) {
    const { photo } = await this.getPhotoById.execute({ photoId: params.id });

    return photoViewModel.toHTTP(photo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param() params: updatePhotoParam,
    @Body() body: updatePhotoBody,
  ) {
    const { photo } = await this.getPhotoById.execute({ photoId: params.id });

    if (!photo.userId === req.user._id) {
      throw new HttpException(
        "User doesn't match with userId from the photo",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { updatedPhoto } = await this.updatePhoto.execute({
      photoId: params.id,
      title: body.title,
    });

    return photoViewModel.toHTTP(updatedPhoto);
  }
}
