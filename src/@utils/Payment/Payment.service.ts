import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { catchError, map, mergeMap } from 'rxjs';
import { PaymentDbService } from './PaymentDb.service';

@Injectable()
export class PaymentService {
  private readonly BASE: string = 'https://gateway.zibal.ir/v1';
  private readonly HOST: string = 'https://event.shirazlug.ir/api';

  constructor(
    private httpService: HttpService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private readonly config: IPaymentConfig,
    private dbService: PaymentDbService,
  ) {}

  public get db() {
    return this.dbService;
  }

  createTransaction(amount: number, userID: string) {
    const transactionID = `${userID}_${Date.now()}`;
    return this.httpService
      .post(`${this.BASE}/request/`, {
        merchant: this.config.merchant,
        amount: amount,
        callbackUrl: this.HOST + '/payment',
        orderId: transactionID,
      })
      .pipe(
        map((item) => {
          return {
            url: `https://gateway.zibal.ir/start/${item.data.trackId}`,
            token: item.data.trackId,
          };
        }),
        catchError((e) => {
          throw e;
        }),
      )
      .pipe(
        mergeMap((item) => {
          return this.dbService
            .create(item.token, transactionID, amount, userID)
            .pipe(map(({ _id }) => ({ ID: _id, amount, ...item })));
        }),
      );
  }

  verifyTransaction(trackingCode: string) {
    return this.verify(trackingCode, 'verify');
  }

  inquiryTransaction(trackingCode: string) {
    return this.verify(trackingCode, 'inquiry');
  }

  private verify(trackingCode: string, action: 'inquiry' | 'verify') {
    return this.httpService
      .post(`${this.BASE}/${action}/`, {
        merchant: this.config.merchant,
        trackId: trackingCode,
      })
      .pipe(
        map((item) => item.data),
        catchError((e) => {
          throw e;
        }),
      );
  }
}
