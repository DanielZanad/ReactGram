import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
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
import { DeletePhoto } from '@app/use-cases/delete-photo';
import { deletePhotoParam } from '../dtos/delete-photo-param';
import { SearchPhoto } from '@app/use-cases/search-photo';
import { PhotoComment } from '@app/entities/photo/PhotoComment';
import { commentPhotoBody, commentPhotoParam } from '../dtos/comment-photo';
import { AddComment } from '@app/use-cases/add-a-comment';
import { photoCommentViewModel } from '../view-models/photoComment-view-model';

@Controller('/api/photos')
export class PhotoController {
  constructor(
    private getAllPhotos: GetAllPhotos,
    private getPhotoById: GetPhotoById,
    private getUserPhotos: GetUserPhotos,
    private updatePhoto: UpdatePhoto,
    private likePhoto: LikePhoto,
    private registerPhoto: RegisterPhoto,
    private deletePhoto: DeletePhoto,
    private searchPhoto: SearchPhoto,
    private addComment: AddComment,
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param() params: deletePhotoParam) {
    const { deletedPhoto } = await this.deletePhoto.execute({
      photoId: params.id,
      userId: req.user._id,
    });

    if (!deletedPhoto) {
      throw new HttpException(
        'Por favor, tente novamente mais tarde',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      id: deletedPhoto.id,
      message: 'Foto excluida com sucesso',
    };
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  async search(@Query('q') query) {
    const { photos } = await this.searchPhoto.execute({ query });

    return photos.map(photoViewModel.toHTTP);
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

  @Put('/comment/:id')
  @UseGuards(JwtAuthGuard)
  async comment(
    @Request() req,
    @Body() body: commentPhotoBody,
    @Param() param: commentPhotoParam,
  ) {
    const photoComment = new PhotoComment({
      comment: body.comment,
      userId: req.user._id,
      userImage: req.user.profileImage,
      userName: req.user.name,
    });

    const { comment } = await this.addComment.execute({
      comment: photoComment,
      photoId: param.id,
    });

    if (!comment) {
      throw new HttpException('Foto não encontrada!', HttpStatus.NOT_FOUND);
    }

    return {
      comment: photoCommentViewModel.toHTTP(comment),
      message: 'O comentario foi adicionado com sucesso',
    };
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
}
