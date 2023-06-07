/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { PaymentDocument } from './entity/Payment.entity';
import { Model } from 'mongoose';
import { GateResponse } from './types/gateResponse.type';
export declare class PaymentDbService {
    private readonly model;
    constructor(model: Model<PaymentDocument>);
    create(trackingCode: string, transactionID: number, amount: number, userID: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, PaymentDocument> & Omit<import("./entity/Payment.entity").Payment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    appendTransactionDetails(paymentID: string, gateWayResponse: GateResponse): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    findByID(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, PaymentDocument> & Omit<import("./entity/Payment.entity").Payment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByTrackingCode(code: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, PaymentDocument> & Omit<import("./entity/Payment.entity").Payment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
