import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): void {
    throw new NotFoundException();
  }
}
