import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { MongoDocumentManager } from '../../MongoDocumentManager';
import { User, DocumentManager as UsersDocumentManager } from '../../../users/entities/user.entity';

@Schema()
export class Payment {
  @Prop({
    required: true,
    type: Number,
  })
  transactionID: number;

  @Prop({
    type: schema.Types.ObjectId,
    require: true,
    ref: 'col_users'
  })
  user: User

  @Prop({
    type: String,
  })
  trackingCode: string;

  @Prop({
    type: Number,
  })
  transactionAmount: number;

  @Prop({
    type: Number,
  })
  refNum: number;

  @Prop({
    type: Number,
    default: -1,
  })
  status: number;

  @Prop({
    type: Number,
  })
  customerRefNum: number;

  @Prop({
    type: String,
  })
  cardHashPan: string;

  @Prop({
    type: String,
  })
  cardMaskPan: string;

  @Prop({
    type: Number,
  })
  date: number;
}

export type PaymentDocument = Payment & Document;
export const PaymentDocumentManager = new MongoDocumentManager(Payment);
