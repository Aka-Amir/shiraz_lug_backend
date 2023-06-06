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
exports.CreateFoodDto = void 0;
const class_validator_1 = require("class-validator");
class CreateFoodDto {
}
exports.CreateFoodDto = CreateFoodDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'foodSetDisplayName_is_empty',
    }),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "foodSetDisplayName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'food_is_empty',
    }),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "food", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'drink_is_empty',
    }),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "drink", void 0);
__decorate([
    (0, class_validator_1.Min)(0, {
        message: 'price_is_tooLow',
    }),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false,
    }, {
        message: 'price_is_empty',
    }),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "price", void 0);
//# sourceMappingURL=create-food.dto.js.map