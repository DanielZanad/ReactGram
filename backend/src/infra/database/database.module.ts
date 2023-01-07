import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserRepository } from '@app/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PhotoRepository } from '@app/repositories/photo-repository';
import { PrismaPhotosRepository } from './prisma/repositories/prisma-photos-repositry';

@Module({
  providers: [
    PrismaService,
    {
      provide: PhotoRepository,
      useClass: PrismaPhotosRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, PhotoRepository],
})
export class DatabaseModule {}
