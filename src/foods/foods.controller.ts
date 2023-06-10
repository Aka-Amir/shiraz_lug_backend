import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodsService } from './foods.service';

@Controller('api/foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto).pipe(
      map((item) => ({
        ID: item._id.toString(),
      })),
    );
  }

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
  //   return this.foodsService.update(id, updateFoodDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.foodsService.remove(id);
  // }
}
