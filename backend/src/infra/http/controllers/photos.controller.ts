import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { photoViewModel } from '../view-models/photo-view-model';
import { GetPhotoById } from '@app/use-cases/get-photo-by-id';
import { GetUserPhotos } from '@app/use-cases/get-user-photos';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdatePhoto } from '@app/use-cases/update-photo';
import { updatePhotoBody, updatePhotoParam } from '../dtos/update-photo';
import { LikePhotoParam } from '../dtos/like-a-photo';
import { LikePhoto } from '@app/use-cases/like-a-photo';
import { registerPhotoBody } from '../dtos/register-photo-body';
import { RegisterPhoto } from '@app/use-cases/register-photo';

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
    private getUserPhotos: GetUserPhotos,
    private updatePhoto: UpdatePhoto,
    private likePhoto: LikePhoto,
    private registerPhoto: RegisterPhoto,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/photos',

        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  async register(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Request() req,
    @Body() body: registerPhotoBody,
  ) {
    let image: Express.Multer.File = null;

    if (file) {
      image = file;
    }

    console.log(req.user);

    const { newPhoto } = await this.registerPhoto.execute({
      image: image.filename,
      title: body.title,
      userId: req.user._id,
      userName: req.user.name,
    });

    return photoViewModel.toHTTP(newPhoto);
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
