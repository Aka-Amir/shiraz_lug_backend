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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, VerficationDto } from './dto/update-user.dto';
import { PaymentService } from '../@utils/Payment';
import { SmsService } from '../@utils';
import { ResendCodeDTO } from './dto/resend-code.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly paymentService;
    private readonly smsService;
    constructor(usersService: UsersService, paymentService: PaymentService, smsService: SmsService);
    create(createUserDto: CreateUserDto): import("rxjs").Observable<{
        ID: any;
    }>;
    resendCode(dto: ResendCodeDTO): import("rxjs").Observable<{
        message: string;
    }>;
    Pay(userID: string): import("rxjs").Observable<{
        url: any;
        token: any;
        ID: any;
        amount: number;
        hotelPrice: number;
        foodPrice: number;
        needTaxi: boolean;
        total: number;
    }>;
    findAll(): import("rxjs").Observable<(import("mongoose").Document<unknown, {}, import("./entities/user.entity").UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, import("./entities/user.entity").UserDocument> & Omit<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    isVerfied(id: string): import("rxjs").Observable<{
        verified: boolean;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    verfiyUser(id: string, updateUserDto: VerficationDto): import("rxjs").Observable<{
        found: boolean;
        verified: boolean;
    }>;
    remove(id: string): import("rxjs").Observable<import("mongodb").DeleteResult>;
}
