import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getHello() {
    return {
      message: true,
    };
  }
}
