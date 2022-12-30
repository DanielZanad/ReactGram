import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '@app/use-cases/register-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [RegisterUser],
})
export class HttpModule {}
