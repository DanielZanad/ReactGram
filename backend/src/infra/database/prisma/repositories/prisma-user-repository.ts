import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(user: User) {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.users.create({
      data: raw,
    });
  }
}
