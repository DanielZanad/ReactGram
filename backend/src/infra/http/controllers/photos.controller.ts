import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { photoViewModel } from '../view-models/photo-view-model';

@Controller('/api/photos')
export class PhotoController {
  constructor(private getAllPhotos: GetAllPhotos) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async allPhotos() {
    const { photos } = await this.getAllPhotos.execute();

    return photos.map(photoViewModel.toHTTP);
  }
}
