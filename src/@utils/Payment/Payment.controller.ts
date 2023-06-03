import { Body, Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { Observable, map, mergeMap } from 'rxjs';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { PaymentService } from './Payment.service';
import { GateResponse } from './types/gateResponse.type';

@Controller('payment')
export class PaymentController {
  constructor(
    private service: PaymentService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private config: IPaymentConfig,
  ) {}

  @Post()
  verify(@Body() body: GateResponse, @Res() res) {
    return this.service.db
      .findByTrackingCode(body.tracking_code)
      .pipe(
        mergeMap((item) => {
          const observable =
            body.Status !== 3
              ? new Observable((subscriber) => {
                  subscriber.next(item);
                })
              : this.service.verifyTransaction(
                  item.trackingCode,
                  item.transactionID,
                );
          return observable.pipe(map(() => item));
        }),
        mergeMap((item) => {
          return this.service.db.appendTransactionDetails(
            item._id.toString(),
            body,
          );
        }),
      )
      .subscribe({
        next() {
          res.redirect(`${this.config.redirectionLink}?code=${body.Status}`);
        },
        error(e) {
          Logger.error(e);
          res.redirect(`${this.config.redirectionLink}?code=${-1}`);
        },
      });
  }
}
