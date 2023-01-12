import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '@app/use-cases/register-user';
import { AuthService } from '@infra/auth/auth.service';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import { UpdateUser } from '@app/use-cases/update-user';
import { PhotoController } from './controllers/photos.controller';
import { GetAllPhotos } from '@app/use-cases/get-all-photos';
import { GetPhotoById } from '@app/use-cases/get-photo-by-id';
import { GetUserPhotos } from '@app/use-cases/get-user-photos';
import { UpdatePhoto } from '@app/use-cases/update-photo';
import { LikePhoto } from '@app/use-cases/like-a-photo';
import { RegisterPhoto } from '@app/use-cases/register-photo';
import { DeletePhoto } from '@app/use-cases/delete-photo';
import { SearchPhoto } from '@app/use-cases/search-photo';
import { AddComment } from '@app/use-cases/add-a-comment';
import { UploadController } from './controllers/uploads.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, PhotoController, UploadController],
  providers: [
    RegisterUser,
    GetUserById,
    UpdateUser,
    AuthService,
    GetAllPhotos,
    GetPhotoById,
    GetUserPhotos,
    UpdatePhoto,
    LikePhoto,
    RegisterPhoto,
    DeletePhoto,
    SearchPhoto,
    AddComment,
  ],
})
export class HttpModule {}
