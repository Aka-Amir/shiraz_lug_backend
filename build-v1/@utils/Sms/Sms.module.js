"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SmsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsModule = void 0;
const common_1 = require("@nestjs/common");
const Sms_service_1 = require("./Sms.service");
const axios_1 = require("@nestjs/axios");
let SmsModule = exports.SmsModule = SmsModule_1 = class SmsModule {
    static register(config) {
        return {
            module: SmsModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: 'SMS_CONFIG',
                    useValue: config,
                },
                Sms_service_1.SmsService,
            ],
            exports: [Sms_service_1.SmsService],
        };
    }
};
exports.SmsModule = SmsModule = SmsModule_1 = __decorate([
    (0, common_1.Module)({})
], SmsModule);
//# sourceMappingURL=Sms.module.js.map