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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDocumentManager = exports.Payment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const MongoDocumentManager_1 = require("../../MongoDocumentManager");
const user_entity_1 = require("../../../users/entities/user.entity");
let Payment = exports.Payment = class Payment {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "transactionID", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        require: true,
        ref: 'col_users'
    }),
    __metadata("design:type", user_entity_1.User)
], Payment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Payment.prototype, "trackingCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "transactionAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "refNum", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: -1,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "customerRefNum", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Payment.prototype, "cardHashPan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Payment.prototype, "cardMaskPan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "date", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)()
], Payment);
exports.PaymentDocumentManager = new MongoDocumentManager_1.MongoDocumentManager(Payment);
//# sourceMappingURL=Payment.entity.js.map