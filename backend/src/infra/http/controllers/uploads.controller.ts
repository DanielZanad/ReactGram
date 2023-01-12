import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('/uploads')
export class UploadController {
  @Get('/users/:id')
  async profileImage(@Param() params, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/users/' + params.id));
  }

  @Get('/photos/:id')
  async photo(@Param() params, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/photos/' + params.id));
  }
}
