export declare class SmsPatternBuilder {
    private _result;
    get result(): {
        patternCode: string;
        inputData: any[];
        toNum: string;
    };
    get toNum(): string;
    setNumber(number: string): this;
    setPrimaryWelcomerPattern(username: string): this;
    setPrimaryHotelReservation(username: string, hotelName: string, days: number): this;
    setCode(code: number): this;
}
