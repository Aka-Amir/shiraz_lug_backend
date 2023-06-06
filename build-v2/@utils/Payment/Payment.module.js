"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const Payment_constants_1 = require("./Payment.constants");
const Payment_controller_1 = require("./Payment.controller");
const Payment_service_1 = require("./Payment.service");
const PaymentDb_service_1 = require("./PaymentDb.service");
const mongoose_1 = require("@nestjs/mongoose");
const Payment_entity_1 = require("./entity/Payment.entity");
const Sms_1 = require("../Sms");
const settling_module_1 = require("../../settling/settling.module");
let PaymentModule = exports.PaymentModule = PaymentModule_1 = class PaymentModule {
    static register(config) {
        return {
            module: PaymentModule_1,
            imports: [
                axios_1.HttpModule,
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: Payment_entity_1.PaymentDocumentManager.collectionName,
                        schema: Payment_entity_1.PaymentDocumentManager.createModel(),
                    },
                ]),
                Sms_1.SmsModule.register({
                    number: '10004223',
                    password: '27385Tky',
                    username: '2283220531',
                    apiKey: 'FceUMKBKCGXpptKBPjgOelXpjX1XOCnstkWUD5eXzH0=',
                }),
                settling_module_1.SettlingModule,
            ],
            controllers: [Payment_controller_1.PaymentController],
            providers: [
                {
                    provide: Payment_constants_1.PAYMENT_CONFIG_PROVIDER,
                    useValue: config,
                },
                Payment_service_1.PaymentService,
                PaymentDb_service_1.PaymentDbService,
            ],
            exports: [Payment_service_1.PaymentService],
        };
    }
};
exports.PaymentModule = PaymentModule = PaymentModule_1 = __decorate([
    (0, common_1.Module)({})
], PaymentModule);
//# sourceMappingURL=Payment.module.js.map