import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { DocumentManager, User } from '../../users/entities/user.entity';
import { Hotels, HotelsDocumentManager } from './hotels.entity';

@Schema()
export class Settling {
  @Prop({
    ref: DocumentManager.collectionName,
    required: true,
  })
  user: User;

  @Prop({
    ref: HotelsDocumentManager.collectionName,
    required: true,
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
