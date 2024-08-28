import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { payload } from './models/models';

@Controller('app/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('generatepdf')
  async getUsers(@Body() payload: payload): Promise<string> {
    return await this.appService.getUsers(payload.html);
  }
}
