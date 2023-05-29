import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SettlingService } from './settling.service';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotels.dto';
import { map } from 'rxjs';
import { UpdateHotelDto } from './dto/update-hotels.dto';

@Controller('settling')
export class SettlingController {
  constructor(
    private readonly settlingService: SettlingService,
    private readonly hotlesService: HotelsService,
  ) {}

  @Post('/reservations')
  create(@Body() createSettlingDto: CreateSettlingDto) {
    return this.settlingService
      .create(createSettlingDto)
      .pipe(map((item) => ({ _id: item._id.toString() })));
  }

  @Get('/reservations')
  findAll() {
    return this.settlingService.findAll();
  }

  @Get('/reservations/:id')
  findOne(@Param('id') id: string) {
    return this.settlingService.findOne(id);
  }

  @Put('/reservations/:id')
  update(
    @Param('id') id: string,
    @Body() updateSettlingDto: UpdateSettlingDto,
  ) {
    return this.settlingService.update(id, updateSettlingDto);
  }

  @Delete('/reservations/:id')
  remove(@Param('id') id: string) {
    return this.settlingService.remove(id);
  }

  // HOTELS
  @Post('/hotel')
  createHotel(@Body() dto: CreateHotelDto) {
    return this.hotlesService
      .create(dto)
      .pipe(map((item) => ({ _id: item._id.toString() })));
  }

  @Get('/hotel')
  findAllHotels() {
    return this.hotlesService.findAll().pipe(i => {
      console.log(i)
      return i;
    });
  }

  @Get('/hotel/:id')
  findOneHotel(@Param('id') id: string) {
    return this.hotlesService.findOne(id);
  }

  @Put('/hotel/:id')
  updateHotel(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotlesService.update(id, dto);
  }

  @Delete('/hotel/:id')
  removeHotel(@Param('id') id: string) {
    return this.hotlesService.remove(id);
  }
}
