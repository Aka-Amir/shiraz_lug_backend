/// <reference types="mongoose/types/document" />
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
export declare class Hotels {
    hotelName: string;
    address: string;
    contactNumber: string;
    perDayPrice: number;
}
export type HotelsDocument = Hotels & Document;
export declare const HotelsDocumentManager: MongoDocumentManager<Hotels>;
