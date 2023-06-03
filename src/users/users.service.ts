import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, mergeMap, throwError } from 'rxjs';
import { SettlingService } from '../settling/settling.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentManager, UserDocument } from './entities/user.entity';

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
      orderedFood: createUserDto.orderedFood || null,
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
        .findOne({ _id: userID }, { orderedFood: 1, _id: 1 })
        .populate('orderedFood')
        .exec(),
    )
      .pipe(
        catchError((_) => {
          console.log('Failed');
          throw new Error('An error has been happen at finding user');
        }),
        map((v) => {
          console.log('Mapping data');
          return {
            foodPrice: v.orderedFood.price,
            id: v._id,
          };
        }),
      )
      .pipe(
        map((item) => {
          Logger.log('Correct data until now');
          return item;
        }),
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
            catchError((e) => {
              console.log(e);
              throw new Error('Cant find user in settling service');
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
