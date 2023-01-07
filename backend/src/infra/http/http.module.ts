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

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, PhotoController],
  providers: [
    RegisterUser,
    GetUserById,
    UpdateUser,
    AuthService,
    GetAllPhotos,
    GetPhotoById,
    GetUserPhotos,
  ],
})
export class HttpModule {}
