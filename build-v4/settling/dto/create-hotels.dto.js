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
exports.CreateHotelDto = void 0;
const class_validator_1 = require("class-validator");
class CreateHotelDto {
}
exports.CreateHotelDto = CreateHotelDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'hotelName_is_empty',
    }),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "hotelName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'address_is_empty',
    }),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'contactNumber_is_empty',
    }),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.Min)(0, {
        message: 'invalid_price',
    }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
    }, {
        message: 'invalid_price',
    }),
    __metadata("design:type", Number)
], CreateHotelDto.prototype, "perDayPrice", void 0);
//# sourceMappingURL=create-hotels.dto.js.map