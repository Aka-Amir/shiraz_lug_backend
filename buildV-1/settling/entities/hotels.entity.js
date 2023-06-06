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
exports.HotelsDocumentManager = exports.Hotels = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const _utils_1 = require("../../@utils");
let Hotels = exports.Hotels = class Hotels {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Hotels.prototype, "hotelName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Hotels.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], Hotels.prototype, "contactNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], Hotels.prototype, "perDayPrice", void 0);
exports.Hotels = Hotels = __decorate([
    (0, mongoose_1.Schema)()
], Hotels);
exports.HotelsDocumentManager = new _utils_1.MongoDocumentManager(Hotels);
//# sourceMappingURL=hotels.entity.js.map