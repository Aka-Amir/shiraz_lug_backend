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
import { Model, Types } from 'mongoose';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';
import { Settling } from './entities';
export declare class SettlingService {
    private settlingModel;
    constructor(settlingModel: Model<Settling.SettlingDocument>);
    create(createSettlingDto: CreateSettlingDto): import("rxjs").Observable<import("mongoose").Document<unknown, {}, Settling.SettlingDocument> & Omit<Settling.Settling & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    findAll(): import("rxjs").Observable<(import("mongoose").Document<unknown, {}, Settling.SettlingDocument> & Omit<Settling.Settling & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, Settling.SettlingDocument> & Omit<Settling.Settling & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    findByUserID(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, Settling.SettlingDocument> & Omit<Settling.Settling & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    update(id: string, updateSettlingDto: UpdateSettlingDto): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): import("rxjs").Observable<import("mongodb").DeleteResult>;
}
