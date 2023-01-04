import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma-user-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
