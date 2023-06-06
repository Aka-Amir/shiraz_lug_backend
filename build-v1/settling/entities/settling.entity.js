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
exports.SettlingDocumentManager = exports.Settling = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const _utils_1 = require("../../@utils");
const user_entity_1 = require("../../users/entities/user.entity");
const hotels_entity_1 = require("./hotels.entity");
let Settling = exports.Settling = class Settling {
};
__decorate([
    (0, mongoose_1.Prop)({
        ref: 'col_users',
        type: mongoose_2.Schema.Types.ObjectId,
        required: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Settling.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: hotels_entity_1.HotelsDocumentManager.collectionName,
        required: true,
        type: mongoose_2.Schema.Types.ObjectId,
    }),
    __metadata("design:type", hotels_entity_1.Hotels)
], Settling.prototype, "hotel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 1,
    }),
    __metadata("design:type", Number)
], Settling.prototype, "days", void 0);
exports.Settling = Settling = __decorate([
    (0, mongoose_1.Schema)()
], Settling);
exports.SettlingDocumentManager = new _utils_1.MongoDocumentManager(Settling);
//# sourceMappingURL=settling.entity.js.map