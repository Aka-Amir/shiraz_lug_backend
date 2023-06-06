/// <reference types="mongoose/types/document" />
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
export declare class Food {
    foodSetDisplayName: string;
    food: string;
    desert: string;
    drink: string;
    price: number;
}
export type FoodDocument = Food & Document;
export declare const FoodDocumentManager: MongoDocumentManager<Food>;
