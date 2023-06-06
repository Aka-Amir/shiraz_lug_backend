"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const settling_service_1 = require("../settling/settling.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(model, settlingService) {
        this.model = model;
        this.settlingService = settlingService;
    }
    create(createUserDto) {
        const user = new this.model({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            gender: createUserDto.gender,
            phoneNumber: createUserDto.phoneNumber,
            city: createUserDto.city || '',
            orderedFood: createUserDto.orderedFood || null,
            needTaxi: createUserDto.needTaxi || false,
            presenceTime: createUserDto.presenceTime || 'full',
        });
        return (0, rxjs_1.from)(user.save());
    }
    findAll() {
        return (0, rxjs_1.from)(this.model.find({}, { __v: 0, verificationCode: 0 }).exec());
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.model.findOne({ _id: id }, { __v: 0 }).exec());
    }
    pay(userID) {
        return (0, rxjs_1.from)(this.model
            .findOne({ _id: userID }, { orderedFood: 1, _id: 1 })
            .populate('orderedFood')
            .exec())
            .pipe((0, rxjs_1.catchError)((_) => {
            console.log('Failed');
            throw new Error('An error has been happen at finding user');
        }), (0, rxjs_1.map)((v) => {
            console.log('Mapping data');
            return {
                foodPrice: v.orderedFood.price,
                id: v === null || v === void 0 ? void 0 : v._id,
            };
        }))
            .pipe((0, rxjs_1.map)((item) => {
            common_1.Logger.log('Correct data until now');
            return item;
        }), (0, rxjs_1.mergeMap)(({ foodPrice, id }) => this.settlingService.findByUserID(id).pipe((0, rxjs_1.map)((data) => {
            var _a, _b;
            const hotelPrice = (((_a = data === null || data === void 0 ? void 0 : data.hotel) === null || _a === void 0 ? void 0 : _a.perDayPrice) || 0) * ((data === null || data === void 0 ? void 0 : data.days) || 0);
            return {
                hotelPrice,
                foodPrice,
                needTaxi: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.needTaxi,
                total: foodPrice + hotelPrice,
            };
        }), (0, rxjs_1.catchError)((e) => {
            console.log(e);
            throw new Error('Cant find user in settling service');
        }))));
    }
    updateVerficationCode(id, code) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 2);
        return (0, rxjs_1.from)(this.model
            .findOneAndUpdate({
            $and: [
                { _id: id },
                {
                    lastCodeSentDate: {
                        $lt: new Date(Date.now()).toISOString(),
                    },
                },
                {
                    verificationCode: {
                        $gt: 0,
                    },
                },
            ],
        }, {
            $set: {
                verificationCode: code,
                lastCodeSentDate: date,
            },
        })
            .exec());
    }
    update(id, updateUserDto) {
        return (0, rxjs_1.from)(this.model
            .updateOne({ _id: id }, Object.assign({}, JSON.parse(JSON.stringify(updateUserDto))))
            .exec());
    }
    verify(id, code) {
        return (0, rxjs_1.from)(this.model
            .updateOne({
            $and: [{ _id: id }, { verificationCode: code }],
        }, {
            verificationCode: 0,
        })
            .exec());
    }
    remove(id) {
        return (0, rxjs_1.from)(this.model.deleteOne({ _id: id }).exec());
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('col_users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        settling_service_1.SettlingService])
], UsersService);
//# sourceMappingURL=users.service.js.map