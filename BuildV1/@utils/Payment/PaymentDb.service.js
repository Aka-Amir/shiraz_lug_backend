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
exports.PaymentDbService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Payment_entity_1 = require("./entity/Payment.entity");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
let PaymentDbService = exports.PaymentDbService = class PaymentDbService {
    constructor(model) {
        this.model = model;
    }
    create(trackingCode, transactionID, amount, userID) {
        const document = new this.model({
            transactionID,
            transactionAmount: amount,
            trackingCode,
            user: userID,
        });
        return (0, rxjs_1.from)(document.save());
    }
    appendTransactionDetails(paymentID, gateWayResponse) {
        return (0, rxjs_1.from)(this.model
            .updateOne({ _id: paymentID }, {
            trackingCode: gateWayResponse.tracking_code,
            transactionAmount: gateWayResponse.transactionAmount,
            refNum: gateWayResponse.RefNum,
            customerRefNum: gateWayResponse.CustomerRefNum,
            cardHashPan: gateWayResponse.CardHashPan,
            cardMaskPan: gateWayResponse.CardMaskPan,
            date: gateWayResponse.datefield,
        })
            .exec());
    }
    findByID(id) {
        return (0, rxjs_1.from)(this.model
            .findOne({ _id: id }, { __v: 0 })
            .populate('user', { __v: 0 })
            .exec());
    }
    findByTrackingCode(code) {
        return (0, rxjs_1.from)(this.model
            .findOne({ trackingCode: code }, { __v: 0 })
            .populate('user', { __v: 0 })
            .populate('user.settling', { __v: 0 })
            .populate('user.settling.hotel', { __v: 0 })
            .exec());
    }
};
exports.PaymentDbService = PaymentDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Payment_entity_1.PaymentDocumentManager.collectionName)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentDbService);
//# sourceMappingURL=PaymentDb.service.js.map