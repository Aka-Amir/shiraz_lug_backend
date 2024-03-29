import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { map } from 'rxjs';
import { CreateHotelDto } from './dto/create-hotels.dto';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateHotelDto } from './dto/update-hotels.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';
import { HotelsService } from './hotels.service';
import { SettlingService } from './settling.service';

@Controller('api/settling')
export class SettlingController {
  constructor(
    private readonly settlingService: SettlingService,
    private readonly hotelsService: HotelsService,
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
    return this.hotelsService
      .create(dto)
      .pipe(map((item) => ({ _id: item._id.toString() })));
  }

  @Get('/hotel')
  findAllHotels() {
    return this.hotelsService.findAll().pipe((i) => {
      console.log(i);
      return i;
    });
  }

  @Get('/hotel/:id')
  findOneHotel(@Param('id') id: string) {
    return this.hotelsService.findOne(id);
  }

  @Put('/hotel/:id')
  updateHotel(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelsService.update(id, dto);
  }

  @Delete('/hotel/:id')
  removeHotel(@Param('id') id: string) {
    return this.hotelsService.remove(id);
  }
}
