import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotels.dto';
import { UpdateHotelDto } from './dto/update-hotels.dto';
import { HotelsDocumentManager, HotelsDocument } from './entities/hotels.entity';
import { from } from 'rxjs';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel('col_hotels')
    private hotelsModel: Model<HotelsDocument>,
  ) {}

  create(dto: CreateHotelDto) {
    const hotelModel = new this.hotelsModel({
      hotelName: dto.hotelName,
      address: dto.address,
      contactNumber: dto.contactNumber,
      perDayPrice: dto.perDayPrice,
    });
    return from(hotelModel.save());
  }

  findAll() {
    return from(
      (async () => {
        const a = await this.hotelsModel.find({}, { __v: 0 }).exec();
        console.log(a);
        return a;
      })(),
    );
  }

  findOne(id: string) {
    return from(this.hotelsModel.findOne({ _id: id }, { __v: 0 }).exec());
  }

  update(id: string, updateDto: UpdateHotelDto) {
    return from(
      this.hotelsModel
        .updateOne(
          { _id: id },
          {
            ...JSON.parse(JSON.stringify(updateDto)),
          },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(
      this.hotelsModel
        .deleteOne({
          _id: id,
        })
        .exec(),
    );
  }
}
