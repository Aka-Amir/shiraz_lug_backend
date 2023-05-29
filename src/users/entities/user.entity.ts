import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { UsersGender } from '../../enums/users-gender.enum';

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
  })
  phoneNumber: string; // no confirmation

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
    required: true,
  })
  city: string;
}


export type UserDocument = User & Document;
export const DocumentManager = new MongoDocumentManager(User);
