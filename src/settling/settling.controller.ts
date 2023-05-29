import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettlingService } from './settling.service';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';

@Controller('settling')
export class SettlingController {
  constructor(private readonly settlingService: SettlingService) {}

  @Post()
  create(@Body() createSettlingDto: CreateSettlingDto) {
    return this.settlingService.create(createSettlingDto);
  }

  @Get()
  findAll() {
    return this.settlingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settlingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettlingDto: UpdateSettlingDto) {
    return this.settlingService.update(+id, updateSettlingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settlingService.remove(+id);
  }
}
