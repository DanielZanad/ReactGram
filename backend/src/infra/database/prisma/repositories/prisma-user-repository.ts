import { User } from '@app/entities/user/User';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(userId: string): Promise<User | null> {
    const result = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) return null;

    return PrismaUserMapper.toDomain(result);
  }

  async emailExists(userEmail: string): Promise<User | null> {
    const result = await this.prisma.users.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!result) return null;

    return PrismaUserMapper.toDomain(result);
  }
  async register(user: User) {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.users.create({
      data: raw,
    });
  }
}
