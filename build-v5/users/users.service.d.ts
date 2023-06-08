/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
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
import { Model } from 'mongoose';
import { SettlingService } from '../settling/settling.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
export declare class UsersService {
    private model;
    private settlingService;
    constructor(model: Model<UserDocument>, settlingService: SettlingService);
    create(createUserDto: CreateUserDto): import("rxjs").Observable<import("mongoose").Document<unknown, {}, UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("rxjs").Observable<(import("mongoose").Document<unknown, {}, UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    pay(userID: string): import("rxjs").Observable<{
        hotelPrice: number;
        foodPrice: number;
        needTaxi: boolean;
        total: number;
    }>;
    updateVerficationCode(id: string, code: number): import("rxjs").Observable<import("mongoose").Document<unknown, {}, UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateUserDto: UpdateUserDto): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    verify(id: string, code: number): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): import("rxjs").Observable<import("mongodb").DeleteResult>;
}
