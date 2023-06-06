import { SmsService } from '../Sms';
import { IPaymentConfig } from './IPaymentConfig';
import { PaymentService } from './Payment.service';
import { GateResponse } from './types/gateResponse.type';
import { SettlingService } from '../../settling/settling.service';
export declare class PaymentController {
    private service;
    private smsClient;
    private settling;
    private readonly config;
    constructor(service: PaymentService, smsClient: SmsService, settling: SettlingService, config: IPaymentConfig);
    verify(body: GateResponse, res: any): import("rxjs").Subscription;
}
