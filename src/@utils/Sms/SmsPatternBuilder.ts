
export class SmsPatternBuilder {
  private _result = {
    patternCode: '',
    inputData: [],
    toNum: '',
  };

  get result() {
    return this._result;
  }

  get toNum() {
    return this._result.toNum;
  }

  setNumber(number: string) {
    this._result.toNum = number.replace('+98', '0');
    return this;
  }

  setPrimaryWelcomerPattern(username: string) {
    this._result.patternCode = 'e4g0ggjv25zpvyj';
    this._result.inputData = [{ username }];
    return this;
  }

  setPrimaryHotelReservation(username: string, hotelName: string, days: number) {
    this._result.patternCode = 'unusaezra0gqiyi';
    this._result.inputData = [{ username, hotel: hotelName, days }];
    return this;
  }

  setCode(code: number) {
    this._result.patternCode = 's5yjtk5cfnjya76';
    this._result.inputData = [{ code, }];
    return this;
  }
}
