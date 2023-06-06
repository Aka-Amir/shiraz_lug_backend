import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as TypeSchema } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { UsersGender } from '../../enums/users-gender.enum';
import { Food, FoodDocumentManager } from '../../foods/entities/food.entity';
import { RandomNumber } from '../../@utils/RandomNumber';

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: Number,
    default: RandomNumber,
  })
  verificationCode: number;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: Number,
    default: UsersGender.NotDefined,
  })
  gender: UsersGender;

  @Prop({
    type: String,
    default: '',
  })
  city: string;

  @Prop({
    ref: FoodDocumentManager.collectionName,
    type: TypeSchema.Types.ObjectId,
  })
  orderedFood: Food;

  @Prop({
    type: Boolean,
    default: false,
  })
  needTaxi: boolean;

  @Prop({
    type: String,
    default: 'full',
  })
  presenceTime: string;

  @Prop({
    type: Date,
    default: () => {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 2);
      return date;
    }
  })
  lastCodeSentDate: Date;
}

export type UserDocument = User & Document;
export const DocumentManager = new MongoDocumentManager(User);
