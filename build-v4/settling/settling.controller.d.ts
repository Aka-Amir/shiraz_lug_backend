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
import { CreateHotelDto } from './dto/create-hotels.dto';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateHotelDto } from './dto/update-hotels.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';
import { HotelsService } from './hotels.service';
import { SettlingService } from './settling.service';
export declare class SettlingController {
    private readonly settlingService;
    private readonly hotelsService;
    constructor(settlingService: SettlingService, hotelsService: HotelsService);
    create(createSettlingDto: CreateSettlingDto): import("rxjs").Observable<{
        _id: any;
    }>;
    findAll(): import("rxjs").Observable<(import("mongoose").Document<unknown, {}, import("./entities/settling.entity").SettlingDocument> & Omit<import("./entities/settling.entity").Settling & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, import("./entities/settling.entity").SettlingDocument> & Omit<import("./entities/settling.entity").Settling & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateSettlingDto: UpdateSettlingDto): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): import("rxjs").Observable<import("mongodb").DeleteResult>;
    createHotel(dto: CreateHotelDto): import("rxjs").Observable<{
        _id: any;
    }>;
    findAllHotels(): import("rxjs").Observable<(import("mongoose").Document<unknown, {}, import("./entities/hotels.entity").HotelsDocument> & Omit<import("./entities/hotels.entity").Hotels & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOneHotel(id: string): import("rxjs").Observable<import("mongoose").Document<unknown, {}, import("./entities/hotels.entity").HotelsDocument> & Omit<import("./entities/hotels.entity").Hotels & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateHotel(id: string, dto: UpdateHotelDto): import("rxjs").Observable<import("mongoose").UpdateWriteOpResult>;
    removeHotel(id: string): import("rxjs").Observable<import("mongodb").DeleteResult>;
}
