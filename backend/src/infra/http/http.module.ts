import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '@app/use-cases/register-user';
import { AuthService } from '@infra/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [RegisterUser, AuthService],
})
export class HttpModule {}
