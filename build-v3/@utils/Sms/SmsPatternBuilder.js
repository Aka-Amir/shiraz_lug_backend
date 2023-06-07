"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsPatternBuilder = void 0;
const common_1 = require("@nestjs/common");
class SmsPatternBuilder {
    constructor() {
        this._result = {
            patternCode: '',
            inputData: [],
            toNum: '',
        };
    }
    get result() {
        return this._result;
    }
    get toNum() {
        return this._result.toNum;
    }
    setNumber(number) {
        this._result.toNum = number.replace('+98', '0');
        return this;
    }
    setPrimaryWelcomerPattern(username) {
        common_1.Logger.debug('setting setPrimaryWelcomerPattern', SmsPatternBuilder.name);
        this._result.patternCode = 'e4g0ggjv25zpvyj';
        this._result.inputData = [{ username }];
        return this;
    }
    setPrimaryHotelReservation(username, hotelName, days) {
        common_1.Logger.debug('setting setPrimaryHotelReservation', SmsPatternBuilder.name);
        this._result.patternCode = 'unusaezra0gqiyi';
        this._result.inputData = [{ username, hotel: hotelName, days }];
        return this;
    }
    setCode(code) {
        common_1.Logger.debug('setting setCode', SmsPatternBuilder.name);
        this._result.patternCode = 's5yjtk5cfnjya76';
        this._result.inputData = [{ code, }];
        return this;
    }
}
exports.SmsPatternBuilder = SmsPatternBuilder;
//# sourceMappingURL=SmsPatternBuilder.js.map