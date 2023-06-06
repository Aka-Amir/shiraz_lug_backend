/// <reference types="mongoose/types/document" />
import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../MongoDocumentManager';
import { User } from '../../../users/entities/user.entity';
export declare class Payment {
    transactionID: number;
    user: User;
    trackingCode: string;
    transactionAmount: number;
    refNum: number;
    status: number;
    customerRefNum: number;
    cardHashPan: string;
    cardMaskPan: string;
    date: number;
}
export type PaymentDocument = Payment & Document;
export declare const PaymentDocumentManager: MongoDocumentManager<Payment>;
