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
exports.PaymentService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const Payment_constants_1 = require("./Payment.constants");
const rxjs_1 = require("rxjs");
const PaymentDb_service_1 = require("./PaymentDb.service");
let PaymentService = exports.PaymentService = class PaymentService {
    constructor(httpService, config, dbService) {
        this.httpService = httpService;
        this.config = config;
        this.dbService = dbService;
        this.BASE = 'https://mellipay.ir/api/v1';
        this.HOST = 'https://event.shirazlug.ir/api';
        this.lastTransactionID = 0;
    }
    get db() {
        return this.dbService;
    }
    createTransaction(amount, userID) {
        let transactionID = Date.now();
        if (transactionID === this.lastTransactionID)
            transactionID += 1;
        this.lastTransactionID = transactionID;
        return this.httpService
            .post(`${this.BASE}/payment/`, {
            TransactionId: transactionID,
            Amount: amount,
            CallBackUrl: this.HOST + '/payment',
        }, {
            headers: {
                'M-Api-Key': this.config.apiKey,
                'M-Sec-Key': this.config.secretKey,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((item) => ({
            url: item.data.link,
            token: item.data.Mellipay_Tracking_Code,
        })), (0, rxjs_1.catchError)((e) => {
            throw e;
        }))
            .pipe((0, rxjs_1.mergeMap)((item) => {
            return this.dbService
                .create(item.token, transactionID, amount, userID)
                .pipe((0, rxjs_1.map)(({ _id }) => (Object.assign({ ID: _id, amount }, item))));
        }));
    }
    verifyTransaction(Mellipay_Tracking_Code, TransactionId) {
        return this.verify(Mellipay_Tracking_Code, TransactionId, 'verify');
    }
    inquiryTransaction(Mellipay_Tracking_Code, TransactionId) {
        return this.verify(Mellipay_Tracking_Code, TransactionId, 'inquiry');
    }
    verify(Mellipay_Tracking_Code, TransactionId, action) {
        return this.httpService
            .post(`${this.BASE}/payment/${action}/`, {
            TransactionId,
            Mellipay_Tracking_Code,
        }, {
            headers: {
                'M-Api-Key': this.config.apiKey,
                'M-Sec-Key': this.config.secretKey,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((item) => item.data), (0, rxjs_1.catchError)((e) => {
            throw e;
        }));
    }
};
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(Payment_constants_1.PAYMENT_CONFIG_PROVIDER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object, PaymentDb_service_1.PaymentDbService])
], PaymentService);
//# sourceMappingURL=Payment.service.js.map