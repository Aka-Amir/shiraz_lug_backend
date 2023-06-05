import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { catchError, map, mergeMap } from 'rxjs';
import { PaymentDbService } from './PaymentDb.service';

@Injectable()
export class PaymentService {
  private readonly BASE: string = 'https://mellipay.ir/api/v1';
  private readonly HOST: string = 'https://shirazlug.ir';
  private lastTransactionID = 0;

  constructor(
    private httpService: HttpService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private readonly config: IPaymentConfig,
    private dbService: PaymentDbService,
  ) {}

  public get db() {
    return this.dbService;
  }

  createTransaction(amount: number, userID: string) {
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
      )
      .pipe(
        mergeMap((item) => {
          return this.dbService
            .create(item.token,transactionID, amount, userID)
            .pipe(map(({ _id }) => ({ ID: _id, amount, ...item })));
        }),
      );
  }

  verifyTransaction(Mellipay_Tracking_Code: string, TransactionId: number) {
    return this.verify(Mellipay_Tracking_Code, TransactionId, 'verify');
  }

  inquiryTransaction(Mellipay_Tracking_Code: string, TransactionId: number) {
    return this.verify(Mellipay_Tracking_Code, TransactionId, 'inquiry');
  }

  private verify(
    Mellipay_Tracking_Code: string,
    TransactionId: number,
    action: 'inquiry' | 'verify',
  ) {
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
          throw e;
        }),
      );
  }
}
