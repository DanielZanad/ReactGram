import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { photoViewModel } from '../view-models/photo-view-model';
import { GetPhotoById } from '@app/use-cases/get-photo-by-id';

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
  ) {}

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
