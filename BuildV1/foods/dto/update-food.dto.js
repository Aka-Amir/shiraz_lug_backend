"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFoodDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_food_dto_1 = require("./create-food.dto");
class UpdateFoodDto extends (0, mapped_types_1.PartialType)(create_food_dto_1.CreateFoodDto) {
}
exports.UpdateFoodDto = UpdateFoodDto;
//# sourceMappingURL=update-food.dto.js.map