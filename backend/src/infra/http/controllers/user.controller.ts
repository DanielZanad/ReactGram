import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('list')
  async list() {
    return this.prisma.users.findMany();
  }
}
