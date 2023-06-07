"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotels_dto_1 = require("./create-hotels.dto");
class UpdateHotelDto extends (0, mapped_types_1.PartialType)(create_hotels_dto_1.CreateHotelDto) {
}
exports.UpdateHotelDto = UpdateHotelDto;
//# sourceMappingURL=update-hotels.dto.js.map