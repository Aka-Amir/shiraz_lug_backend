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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const Sms_1 = require("../Sms");
const Payment_constants_1 = require("./Payment.constants");
const Payment_service_1 = require("./Payment.service");
const settling_service_1 = require("../../settling/settling.service");
let PaymentController = exports.PaymentController = class PaymentController {
    constructor(service, smsClient, settling, config) {
        this.service = service;
        this.smsClient = smsClient;
        this.settling = settling;
        this.config = config;
    }
    verify(body, res) {
        return this.service.db
            .findByTrackingCode(body.tracking_code)
            .pipe((0, rxjs_1.mergeMap)((item) => {
            const observable = body.Status !== -1
                ? new rxjs_1.Observable((subscriber) => {
                    subscriber.next(item);
                })
                : this.service.verifyTransaction(item.trackingCode, item.transactionID);
            return observable.pipe((0, rxjs_1.map)(() => item));
        }), (0, rxjs_1.mergeMap)((item) => {
            return this.service.db
                .appendTransactionDetails(item._id.toString(), body)
                .pipe((0, rxjs_1.map)(() => {
                return {
                    phoneNumber: item.user.phoneNumber,
                    userName: item.user.firstName,
                    userID: item.user._id,
                };
            }));
        }), (0, rxjs_1.mergeMap)((item) => {
            return this.settling
                .findByUserID(item.userID)
                .pipe((0, rxjs_1.map)((doc) => (Object.assign(Object.assign({}, item), { settling: doc }))));
        }), (0, rxjs_1.mergeMap)((result) => {
            return (0, rxjs_1.iif)(() => body.Status == 3, this.smsClient
                .sendPatternMessage(new Sms_1.SmsPatternBuilder()
                .setNumber(result.phoneNumber)
                .setPrimaryWelcomerPattern(result.userName))
                .pipe((0, rxjs_1.mergeMap)((i) => {
                var _a, _b, _c;
                return (0, rxjs_1.iif)(() => {
                    console.log('RESULT', result);
                    return !!result.settling;
                }, this.smsClient
                    .sendPatternMessage(new Sms_1.SmsPatternBuilder()
                    .setNumber(result.phoneNumber)
                    .setPrimaryHotelReservation(result.userName, (_b = (_a = result.settling) === null || _a === void 0 ? void 0 : _a.hotel) === null || _b === void 0 ? void 0 : _b.hotelName, (_c = result.settling) === null || _c === void 0 ? void 0 : _c.days)), new rxjs_1.Observable((sub) => sub.next(i)));
            })), rxjs_1.EMPTY).pipe((0, rxjs_1.map)(() => result));
        }))
            .subscribe({
            next: (result) => {
                common_1.Logger.debug(result);
                res.redirect(`${this.config.redirectionLink}?code=${body.Status}?payment=true`);
            },
            error: (e) => {
                common_1.Logger.error(e);
                res.redirect(`${this.config.redirectionLink}?code=${-1}?payment=true`);
            },
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "verify", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('api/payment'),
    __param(3, (0, common_1.Inject)(Payment_constants_1.PAYMENT_CONFIG_PROVIDER)),
    __metadata("design:paramtypes", [Payment_service_1.PaymentService,
        Sms_1.SmsService,
        settling_service_1.SettlingService, Object])
], PaymentController);
//# sourceMappingURL=Payment.controller.js.map