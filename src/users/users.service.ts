import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, merge, mergeMap } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentManager, User, UserDocument } from './entities/user.entity';
import { SettlingService } from 'src/settling/settling.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(DocumentManager.collectionName)
    private model: Model<UserDocument>,
    private settlingService: SettlingService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.model({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      gender: createUserDto.gender,
      phoneNumber: createUserDto.phoneNumber,
      city: createUserDto.city,
      orderedFood: null,
      needTaxi: createUserDto.needTaxi || false,
      presenceTime: createUserDto.presenceTime || 'full',
    });
    return from(user.save());
  }

  findAll() {
    return from(this.model.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(this.model.findOne({ _id: id }, { __v: 0 }).exec());
  }

  pay(userID: string) {
    return from(
      this.model
        .findById(userID, { orderedFood: 1, _id: 1 })
        .populate('orderedFood')
        .exec(),
    )
      .pipe(
        map((v) => {
          return {
            foodPrice: v.orderedFood.price,
            id: v._id.toString(),
          };
        }),
      )
      .pipe(
        mergeMap(({ foodPrice, id }) =>
          this.settlingService.findByUserID(id).pipe(
            map(({ hotel, user, days }) => {
              const hotelPrice = hotel.perDayPrice * days;
              return {
                hotelPrice,
                foodPrice,
                needTaxi: user.needTaxi,
                total: foodPrice + hotelPrice,
              };
            }),
          ),
        ),
      );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return from(
      this.model
        .updateOne(
          { _id: id },
          { ...JSON.parse(JSON.stringify(updateUserDto)) },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.model.deleteOne({ _id: id }).exec());
  }
}
