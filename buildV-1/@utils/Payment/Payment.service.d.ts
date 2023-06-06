import { HttpService } from '@nestjs/axios';
import { IPaymentConfig } from './IPaymentConfig';
import { PaymentDbService } from './PaymentDb.service';
export declare class PaymentService {
    private httpService;
    private readonly config;
    private dbService;
    private readonly BASE;
    private readonly HOST;
    private lastTransactionID;
    constructor(httpService: HttpService, config: IPaymentConfig, dbService: PaymentDbService);
    get db(): PaymentDbService;
    createTransaction(amount: number, userID: string): import("rxjs").Observable<{
        url: any;
        token: any;
        ID: any;
        amount: number;
    }>;
    verifyTransaction(Mellipay_Tracking_Code: string, TransactionId: number): import("rxjs").Observable<any>;
    inquiryTransaction(Mellipay_Tracking_Code: string, TransactionId: number): import("rxjs").Observable<any>;
    private verify;
}
