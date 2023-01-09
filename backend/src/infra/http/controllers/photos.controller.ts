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

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
    private getUserPhotos: GetUserPhotos,
    private updatePhoto: UpdatePhoto,
  ) {}

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
}
