import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [PrismaService],
})
export class HttpModule {}
