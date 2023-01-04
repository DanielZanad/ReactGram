import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '@app/use-cases/register-user';
import { AuthService } from '@infra/auth/auth.service';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import { UpdateUser } from '@app/use-cases/update-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [RegisterUser, GetUserById, UpdateUser, AuthService],
})
export class HttpModule {}
