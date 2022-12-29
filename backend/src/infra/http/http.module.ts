import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { User } from './controllers/user.controller';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [User],
  providers: [PrismaService],
})
export class HttpModule {}
