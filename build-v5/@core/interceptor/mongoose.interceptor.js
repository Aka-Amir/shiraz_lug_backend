"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const axios_1 = require("axios");
let MongooseInterceptor = exports.MongooseInterceptor = class MongooseInterceptor {
    intercept(_ctx, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((error) => {
            if (error instanceof common_1.HttpException)
                throw error;
            if (error instanceof mongoose_1.Error) {
                if (error instanceof mongoose_1.Error.DocumentNotFoundError)
                    throw new common_1.NotFoundException();
                if (error instanceof mongoose_1.Error.CastError)
                    throw new common_1.BadRequestException();
            }
            if (error instanceof mongodb_1.MongoError) {
                switch (error.code) {
                    case 11000:
                        throw new common_1.ConflictException();
                    default:
                        console.log(error.code);
                }
            }
            if (error instanceof axios_1.AxiosError) {
                throw new common_1.HttpException(error.message, (error.status || 412));
            }
            throw common_1.InternalServerErrorException;
        }));
    }
};
exports.MongooseInterceptor = MongooseInterceptor = __decorate([
    (0, common_1.Injectable)()
], MongooseInterceptor);
//# sourceMappingURL=mongoose.interceptor.js.map