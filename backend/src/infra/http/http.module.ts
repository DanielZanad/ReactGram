import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '@app/use-cases/register-user';
import { AuthService } from '@infra/auth/auth.service';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import { UpdateUser } from '@app/use-cases/update-user';
import { PhotoController } from './controllers/photos.controller';
import { GetAllPhotos } from '@app/use-cases/get-all-photos';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, PhotoController],
  providers: [RegisterUser, GetUserById, UpdateUser, AuthService, GetAllPhotos],
})
export class HttpModule {}
