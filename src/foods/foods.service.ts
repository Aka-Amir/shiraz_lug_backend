import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import {
  FoodDocument,
  FoodDocumentManager
} from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(FoodDocumentManager.collectionName)
    private readonly model: Model<FoodDocument>,
  ) {}
  create(createFoodDto: CreateFoodDto) {
    const document = new this.model({
      foodSetDisplayName: createFoodDto.foodSetDisplayName,
      food: createFoodDto.food,
      drink: createFoodDto.drink,
      desert: createFoodDto.desert,
      price: createFoodDto.price
    });
    return from(document.save());
  }

  findAll() {
    return from(this.model.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(this.model.findOne({ _id: id }, { __v: 0 }).exec());
  }

  update(id: string, updateFoodDto: UpdateFoodDto) {
    return from(
      this.model
        .updateOne(
          {
            _id: id,
          },
          {
            ...JSON.parse(JSON.stringify(updateFoodDto)),
          },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.model.deleteOne({ _id: id }).exec());
  }
}
