import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.consts';
import { catchError, map } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly BASE: string = 'https://mellipay.ir/api/v1';
  private readonly HOST: string = 'https://shirazlug.ir';
  private lastTransactionID: number = 0;

  constructor(
    private httpService: HttpService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private readonly config: IPaymentConfig,
  ) {}

  createTransaction(amount: number) {
    let transactionID = Date.now();
    if (transactionID === this.lastTransactionID) transactionID += 1;
    this.lastTransactionID = transactionID;
    return this.httpService
      .post(
        `${this.BASE}/payment/`,
        {
          TransactionId: transactionID,
          Amount: amount,
          CallBackUrl: this.HOST + '/payment',
        },
        {
          headers: {
            'M-Api-Key': this.config.apiKey,
            'M-Sec-Key': this.config.secretKey,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        map((item) => ({
          url: item.data.link,
          token: item.data.Mellipay_Tracking_Code,
        })),
        catchError((e) => {
          throw e;
        }),
      );
  }

  verifyTransaction(Mellipay_Tracking_Code: string, TransactionId: number) {
    return this.verfiy(Mellipay_Tracking_Code, TransactionId, "verify");
  }

  inqueryTransaction(Mellipay_Tracking_Code: string, TransactionId: number) {
    return this.verfiy(Mellipay_Tracking_Code, TransactionId, "inquiry");
  }

  private verfiy(Mellipay_Tracking_Code: string, TransactionId: number, action: "inquiry" | "verify") {
    return this.httpService
      .post(
        `${this.BASE}/payment/${action}/`,
        {
          TransactionId,
          Mellipay_Tracking_Code,
        },
        {
          headers: {
            'M-Api-Key': this.config.apiKey,
            'M-Sec-Key': this.config.secretKey,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        map((item) => item.data),
        catchError((e) => {
          console.log(e);
          throw e;
        }),
      );
  }
}
