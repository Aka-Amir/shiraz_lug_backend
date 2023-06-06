"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettlingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_settling_dto_1 = require("./create-settling.dto");
class UpdateSettlingDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_settling_dto_1.CreateSettlingDto, ['userID'])) {
}
exports.UpdateSettlingDto = UpdateSettlingDto;
//# sourceMappingURL=update-settling.dto.js.map