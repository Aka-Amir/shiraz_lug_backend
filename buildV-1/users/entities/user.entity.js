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
exports.DocumentManager = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const _utils_1 = require("../../@utils");
const users_gender_enum_1 = require("../../enums/users-gender.enum");
const food_entity_1 = require("../../foods/entities/food.entity");
const RandomNumber_1 = require("../../@utils/RandomNumber");
let User = exports.User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: RandomNumber_1.RandomNumber,
    }),
    __metadata("design:type", Number)
], User.prototype, "verificationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: users_gender_enum_1.UsersGender.NotDefined,
    }),
    __metadata("design:type", Number)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: food_entity_1.FoodDocumentManager.collectionName,
        type: mongoose_2.Schema.Types.ObjectId,
    }),
    __metadata("design:type", food_entity_1.Food)
], User.prototype, "orderedFood", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "needTaxi", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'full',
    }),
    __metadata("design:type", String)
], User.prototype, "presenceTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 2);
            return date;
        }
    }),
    __metadata("design:type", Date)
], User.prototype, "lastCodeSentDate", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.DocumentManager = new _utils_1.MongoDocumentManager(User);
//# sourceMappingURL=user.entity.js.map