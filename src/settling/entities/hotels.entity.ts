import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';

@Schema()
export class Hotels {
  @Prop({
    required: true,
    type: String,
  })
  hotelName: string;

  @Prop({
    required: true,
    type: String,
  })
  address: string;

  @Prop({
    required: false,
    type: String,
  })
  contactNumber: string;

  @Prop({
    required: true,
    type: Number,
  })
  perDayPrice: number;
}

export type HotelsDocument = Hotels & Document;
export const HotelsDocumentManager = new MongoDocumentManager(Hotels);
