import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as TypeSchema } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { User } from '../../users/entities/user.entity';
import { Hotels, HotelsDocumentManager } from './hotels.entity';

@Schema()
export class Settling {
  @Prop({
    ref: 'col_users',
    type: TypeSchema.Types.ObjectId,
    required: true,
  })
  user: User;

  @Prop({
    ref: HotelsDocumentManager.collectionName,
    required: true,
    type: TypeSchema.Types.ObjectId,
  })
  hotel: Hotels;

  @Prop({
    type: Number,
    default: 1,
  })
  days: number;
}

export type SettlingDocument = Settling & Document;
export const SettlingDocumentManager = new MongoDocumentManager(Settling);
