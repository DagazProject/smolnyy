import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { dict_type } from './spb/dict_type.entity';
import { dict } from './spb/dict.entity';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('dict')
  @ApiOkResponse({ description: 'Successfully.'})
  async getDictTypes(): Promise<dict_type[]> {
    return this.service.getDictTypes();
  }

  @Get('dict/:id')
  @ApiParam({name: 'id', type: 'integer'})
  @ApiOkResponse({ description: 'Successfully.'})
  async getDict(@Param('id') id): Promise<dict[]> {
    return this.service.getDict(id);
  }

  @Get('scenario/:id')
  @ApiParam({name: 'id', type: 'integer'})
  @ApiOkResponse({ description: 'Successfully.'})
  async getScenario(@Param('id') id): Promise<string> {
    return this.service.getScenario(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const buffer = file.buffer;
    const text = buffer.toString('utf8');
    console.log(text);
  }
}
