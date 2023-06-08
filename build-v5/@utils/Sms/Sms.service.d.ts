import { ISmsConfig } from './interfaces';
import { SmsPatternBuilder } from './SmsPatternBuilder';
import { HttpService } from '@nestjs/axios';
export declare class SmsService {
    private readonly config;
    private readonly httpService;
    private readonly URL;
    constructor(config: ISmsConfig, httpService: HttpService);
    sendPatternMessage(smsData: SmsPatternBuilder): import("rxjs").Observable<import("axios").AxiosResponse<any, any>>;
    sendCommercialMessage(message: string, numbers: string[]): import("rxjs").Observable<import("axios").AxiosResponse<any, any>>;
    private _sendPatternMessage;
    private _sendCommercialMessage;
}
