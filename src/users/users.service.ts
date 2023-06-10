import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, mergeMap } from 'rxjs';
import { SettlingService } from '../settling/settling.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('col_users')
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
      city: createUserDto.city || '',
      orderedFood: createUserDto.orderedFood || null,
      needTaxi: createUserDto.needTaxi || false,
      presenceTime: createUserDto.presenceTime || 'full',
    });
    return from(user.save());
  }

  findAll() {
    return from(this.model.find({}, { __v: 0, verificationCode: 0 }).exec());
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
          throw new Error('An error has been happen at finding user');
        }),
        map((v) => {
          return {
            foodPrice: v.orderedFood.price,
            id: v?._id,
          };
        }),
      )
      .pipe(
        map((item) => {
          return item;
        }),
        mergeMap(({ foodPrice, id }) =>
          this.settlingService.findByUserID(id).pipe(
            map((data) => {
              const hotelPrice =
                (data?.hotel?.perDayPrice || 0) * (data?.days || 0);
              return {
                hotelPrice,
                foodPrice,
                needTaxi: data?.user?.needTaxi,
                total: foodPrice + hotelPrice,
              };
            }),
            catchError((e) => {
              throw e;
            }),
          ),
        ),
      );
  }

  updateVerficationCode(id: string, code: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 2);
    return from(
      this.model
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                lastCodeSentDate: {
                  $lt: new Date(Date.now()).toISOString(),
                },
              },
              {
                verificationCode: {
                  $gt: 0,
                },
              },
            ],
          },
          {
            $set: {
              verificationCode: code,
              lastCodeSentDate: date,
            },
          },
        )
        .exec(),
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

  verify(id: string, code: number) {
    return from(
      this.model
        .updateOne(
          {
            $and: [{ _id: id }, { verificationCode: code }],
          },
          {
            verificationCode: 0,
          },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.model.deleteOne({ _id: id }).exec());
  }
}
