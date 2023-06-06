/// <reference types="mongoose/types/document" />
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
import { UsersGender } from '../../enums/users-gender.enum';
import { Food } from '../../foods/entities/food.entity';
export declare class User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    verificationCode: number;
    email: string;
    gender: UsersGender;
    city: string;
    orderedFood: Food;
    needTaxi: boolean;
    presenceTime: string;
    lastCodeSentDate: Date;
}
export type UserDocument = User & Document;
export declare const DocumentManager: MongoDocumentManager<User>;
