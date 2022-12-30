import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserRepository } from '@app/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
