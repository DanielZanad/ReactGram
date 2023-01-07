import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
  UploadedFile,
  Put,
  ParseFilePipe,
  FileTypeValidator,
  Param,
} from '@nestjs/common';
import { registerUserBody } from '../dtos/register-user-body';
import { RegisterUser } from '@app/use-cases/register-user';
import { LocalAuthGuard } from '@infra/auth/local-auth.guard';
import { AuthService } from '@infra/auth/auth.service';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { updateUserBody } from '../dtos/update-user-body';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import { UpdateUser } from '@app/use-cases/update-user';
import { getUserIdParam } from '../dtos/get-user-id-param';
import { UserViewModel } from '@infra/http/view-models/user-view-model';

@Controller('api/users')
export class UserController {
  constructor(
    private registerUser: RegisterUser,
    private getUserById: GetUserById,
    private updateUser: UpdateUser,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: registerUserBody) {
    const { password, email, name } = body;

    const { user } = await this.registerUser.execute({
      name,
      email,
      password,
    });

    return {
      user,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads/users',

        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body()
    body: updateUserBody,
    @Request() req,
  ) {
    const { name, password, bio } = body;

    let profileImage: Express.Multer.File = null;

    if (file) {
      profileImage = file;
    }

    const { user } = await this.getUserById.execute({ userId: req.user._id });

    const { updatedUser } = await this.updateUser.execute({
      user,
      profileImage,
      name,
      password,
      bio,
    });

    return { updatedUser };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  async findOne(@Param() params: getUserIdParam) {
    console.log(params.id);

    const { user } = await this.getUserById.execute({ userId: params.id });
    return UserViewModel.toHTTP(user);
  }
}
