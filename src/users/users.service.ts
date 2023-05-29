import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentManager, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(DocumentManager.collectionName)
    private model: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.model({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      gender: createUserDto.gender,
      phoneNumber: createUserDto.phoneNumber,
      city: createUserDto.city,
    });
    return from(user.save());
  }

  findAll() {
    return from(this.model.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(this.model.findOne({ _id: id }, { __v: 0 }).exec());
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
