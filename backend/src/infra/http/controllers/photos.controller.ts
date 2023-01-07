import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { photoViewModel } from '../view-models/photo-view-model';
import { GetPhotoById } from '@app/use-cases/get-photo-by-id';
import { GetUserPhotos } from '@app/use-cases/get-user-photos';

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
    private getUserPhotos: GetUserPhotos,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async photoById(@Param() params) {
    const { photo } = await this.getPhotoById.execute({ photoId: params.id });

    return photoViewModel.toHTTP(photo);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async allPhotos() {
    const { photos } = await this.getAllPhotos.execute();

    return photos.map(photoViewModel.toHTTP);
  }
}
