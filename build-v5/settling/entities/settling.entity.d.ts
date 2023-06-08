import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { User } from '../../users/entities/user.entity';
import { Hotels } from './hotels.entity';
export declare class Settling {
    user: User;
    hotel: Hotels;
    days: number;
}
export type SettlingDocument = Settling & Document;
export declare const SettlingDocumentManager: MongoDocumentManager<Settling>;
