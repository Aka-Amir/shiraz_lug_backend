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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let SmsService = exports.SmsService = class SmsService {
    constructor(config, httpService) {
        this.config = config;
        this.httpService = httpService;
        this.URL = 'http://ippanel.com/api/select';
    }
    sendPatternMessage(smsData) {
        return this._sendPatternMessage(Object.assign({ op: 'pattern', fromNum: this.config.number, pass: this.config.password, user: this.config.username }, smsData.result));
    }
    sendCommercialMessage(message, numbers) {
        return this._sendCommercialMessage({
            from: this.config.number,
            uname: this.config.username,
            pass: this.config.password,
            message,
            op: 'send',
            to: numbers,
        });
    }
    _sendPatternMessage(payload) {
        if (payload.op !== 'pattern')
            throw new Error('Invalid operation');
        return this.httpService.post(this.URL, payload);
    }
    _sendCommercialMessage(payload) {
        if (payload.op !== 'send')
            throw new Error('Invalid operation');
        return this.httpService.post(this.URL, payload);
    }
};
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SMS_CONFIG')),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], SmsService);
//# sourceMappingURL=Sms.service.js.map