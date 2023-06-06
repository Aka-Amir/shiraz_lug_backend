"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const Payment_1 = require("../@utils/Payment");
const Sms_1 = require("../@utils/Sms");
const settling_module_1 = require("../settling/settling.module");
let UsersModule = exports.UsersModule = UsersModule_1 = class UsersModule {
    static registerService() {
        return {
            module: UsersModule_1,
            providers: [users_service_1.UsersService],
            exports: [users_service_1.UsersService]
        };
    }
};
exports.UsersModule = UsersModule = UsersModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'col_users',
                    schema: user_entity_1.DocumentManager.createModel(),
                },
            ]),
            Payment_1.PaymentModule.register({
                apiKey: '0ktFBxNVj2Beel_NVA',
                secretKey: 'pgno6T3Gs4ef7p2812Ec',
                redirectionLink: 'https://google.com',
            }),
            Sms_1.SmsModule.register({
                number: '10004223',
                password: '27385Tky',
                username: '2283220531',
                apiKey: 'FceUMKBKCGXpptKBPjgOelXpjX1XOCnstkWUD5eXzH0=',
            }),
            settling_module_1.SettlingModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map