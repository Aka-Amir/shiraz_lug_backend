import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { catchError, from } from 'rxjs';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';
import { Settling } from './entities';

@Injectable()
export class SettlingService {
  constructor(
    @InjectModel('col_settling')
    private settlingModel: Model<Settling.SettlingDocument>,
  ) {}

  create(createSettlingDto: CreateSettlingDto) {
    const model = new this.settlingModel({
      user: new Types.ObjectId(createSettlingDto.userID),
      hotel: new Types.ObjectId(createSettlingDto.hotelID),
      days: createSettlingDto.days,
    });
    return from(model.save());
  }

  findAll() {
    return from(this.settlingModel.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(
      this.settlingModel
        .findOne({ _id: id }, { __v: 0 })
        .populate('user', { __v: 0 })
        .populate('hotel', { __v: 0 })
        .exec(),
    );
  }

  findByUserID(id: string) {
    return from(
      this.settlingModel
        .findOne({ user: id }, { __v: 0 })
        .populate('user', { __v: 0 })
        .populate('hotel', { __v: 0 })
        .exec(),
    ).pipe(
      catchError((e) => {
        throw e;
      }),
    );
  }

  update(id: string, updateSettlingDto: UpdateSettlingDto) {
    return from(
      this.settlingModel
        .updateOne(
          { _id: id },
          {
            ...JSON.parse(JSON.stringify(updateSettlingDto)),
          },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.settlingModel.deleteOne({ _id: id }).exec());
  }
}
