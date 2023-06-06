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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
let HotelsService = exports.HotelsService = class HotelsService {
    constructor(hotelsModel) {
        this.hotelsModel = hotelsModel;
    }
    create(dto) {
        const hotelModel = new this.hotelsModel({
            hotelName: dto.hotelName,
            address: dto.address,
            contactNumber: dto.contactNumber,
            perDayPrice: dto.perDayPrice,
        });
        return (0, rxjs_1.from)(hotelModel.save());
    }
    findAll() {
        return (0, rxjs_1.from)((async () => {
            const a = await this.hotelsModel.find({}, { __v: 0 }).exec();
            console.log(a);
            return a;
        })());
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.hotelsModel.findOne({ _id: id }, { __v: 0 }).exec());
    }
    update(id, updateDto) {
        return (0, rxjs_1.from)(this.hotelsModel
            .updateOne({ _id: id }, Object.assign({}, JSON.parse(JSON.stringify(updateDto))))
            .exec());
    }
    remove(id) {
        return (0, rxjs_1.from)(this.hotelsModel
            .deleteOne({
            _id: id,
        })
            .exec());
    }
};
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('col_hotels')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map