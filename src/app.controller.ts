import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { dict_type } from './spb/dict_type.entity';
import { dict } from './spb/dict.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './spb/user.interface';
import { AuthGuard } from './spb/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('auth')
  @ApiBody({ type: User })
  @ApiOkResponse({ description: 'Successfully.'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
  async login(@Res() res, @Body() x: User): Promise<{ access_token: string }> {
      try {
        const r = await this.service.getToken(x.login, x.pass);
        return res.status(HttpStatus.OK).json(r);
      } catch (e) {
         return res.status(HttpStatus.NOT_FOUND).json({ error: e.message.error.toString() });
      }
  }

  @UseGuards(AuthGuard)
  @Get('dict')
  @ApiOkResponse({ description: 'Successfully.'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
  async getDictTypes(@Res() res): Promise<dict_type[]> {
     try {
        const r = await this.service.getDictTypes();
        return res.status(HttpStatus.OK).json(r);
     } catch (e) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
     }
  }

  @UseGuards(AuthGuard)
  @Get('dict/:id')
  @ApiParam({name: 'id', type: 'integer'})
  @ApiOkResponse({ description: 'Successfully.'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
  async getDict(@Res() res, @Param('id') id): Promise<dict[]> {
    try {
       const r = await this.service.getDict(id);
       return res.status(HttpStatus.OK).json(r);
    } catch (e) {
       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
    }
  }

  @UseGuards(AuthGuard)
  @Get('scenario/:id')
  @ApiParam({name: 'id', type: 'integer'})
  @ApiOkResponse({ description: 'Successfully.'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
  async getScenario(@Res() res, @Param('id') id): Promise<string> {
    try {
        const r = await this.service.getScenario(id);
        return res.status(HttpStatus.OK).json(r);
    } catch (e) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
    }
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const buffer = file.buffer;
    const text = buffer.toString('utf8');
    console.log(text);
  }
}
