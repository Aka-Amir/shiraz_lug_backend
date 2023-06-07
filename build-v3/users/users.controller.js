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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const rxjs_1 = require("rxjs");
const Payment_1 = require("../@utils/Payment");
const _utils_1 = require("../@utils");
const resend_code_dto_1 = require("./dto/resend-code.dto");
const RandomNumber_1 = require("../@utils/RandomNumber");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService, paymentService, smsService) {
        this.usersService = usersService;
        this.paymentService = paymentService;
        this.smsService = smsService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto).pipe((0, rxjs_1.mergeMap)((item) => {
            return this.smsService
                .sendPatternMessage(new _utils_1.SmsPatternBuilder()
                .setNumber(item.phoneNumber)
                .setCode(item.verificationCode))
                .pipe((0, rxjs_1.map)(() => {
                return { ID: item._id.toString() };
            }));
        }));
    }
    resendCode(dto) {
        const newCode = (0, RandomNumber_1.RandomNumber)();
        return this.usersService.updateVerficationCode(dto.id, newCode).pipe((0, rxjs_1.map)((result) => {
            if (!result)
                throw new common_1.ForbiddenException();
            return result;
        }), (0, rxjs_1.mergeMap)((result) => {
            if (!result)
                throw new common_1.ForbiddenException();
            return this.smsService
                .sendPatternMessage(new _utils_1.SmsPatternBuilder()
                .setNumber(result.phoneNumber)
                .setCode(newCode))
                .pipe((0, rxjs_1.map)(() => ({ message: 'sent' })));
        }));
    }
    Pay(userID) {
        return this.usersService.pay(userID).pipe((0, rxjs_1.mergeMap)((price) => {
            return this.paymentService.createTransaction(price.total, userID).pipe((0, rxjs_1.map)((item) => (Object.assign(Object.assign({}, price), item))));
        }));
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(id).pipe((0, rxjs_1.map)((item) => {
            delete item.verificationCode;
            return item;
        }));
    }
    isVerfied(id) {
        return this.usersService.findOne(id).pipe((0, rxjs_1.map)((item) => {
            return {
                verified: item.verificationCode === 0,
            };
        }));
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    verfiyUser(id, updateUserDto) {
        return this.usersService.verify(id, updateUserDto.code).pipe((0, rxjs_1.map)((result) => {
            return {
                found: Boolean(result.matchedCount),
                verified: Boolean(result.modifiedCount),
            };
        }));
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('resend_code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_code_dto_1.ResendCodeDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resendCode", null);
__decorate([
    (0, common_1.Get)('/pay/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "Pay", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('is_verified/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "isVerfied", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('verify/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.VerficationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "verfiyUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        Payment_1.PaymentService,
        _utils_1.SmsService])
], UsersController);
//# sourceMappingURL=users.controller.js.map