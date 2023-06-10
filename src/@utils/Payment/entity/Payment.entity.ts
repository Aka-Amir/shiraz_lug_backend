import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { MongoDocumentManager } from '../../MongoDocumentManager';
import { User } from '../../../users/entities/user.entity';

@Schema()
export class Payment {
  @Prop({
    required: true,
    type: String,
  })
  transactionID: string;

  @Prop({
    type: schema.Types.ObjectId,
    require: true,
    ref: 'col_users',
  })
  user: User;

  @Prop({
    type: String,
    required: true,
  })
  trackingCode: string;

  @Prop({
    type: Number,
  })
  transactionAmount: number;

  @Prop({
    type: Number,
    default: -1,
  })
  status: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export type PaymentDocument = Payment & Document;
export const PaymentDocumentManager = new MongoDocumentManager(Payment);
