import { Body, Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { EMPTY, Observable, catchError, iif, map, mergeMap } from 'rxjs';
import { SmsPatternBuilder, SmsService } from '../Sms';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { PaymentService } from './Payment.service';
import { GateResponse } from './types/gateResponse.type';
import { SettlingService } from '../../settling/settling.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private service: PaymentService,
    private smsClient: SmsService,
    private settling: SettlingService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private readonly config: IPaymentConfig,
  ) {}

  @Post()
  verify(@Body() body: GateResponse, @Res() res) {
    return this.service.db
      .findByTrackingCode(body.tracking_code)
      .pipe(
        mergeMap((item) => {
          const observable =
            body.Status !== -1
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
          return this.service.db
            .appendTransactionDetails(item._id.toString(), body)
            .pipe(
              map(() => {
                return {
                  phoneNumber: item.user.phoneNumber,
                  userName: item.user.firstName,
                  userID: (item.user as any)._id,
                };
              }),
            );
        }),
        mergeMap((item) => {
          return this.settling
            .findByUserID(item.userID)
            .pipe(map((doc) => ({ ...item, settling: doc })));
        }),
        mergeMap((result) => {
          return iif(
            () => body.Status == 3,
            this.smsClient
              .sendPatternMessage(
                new SmsPatternBuilder()
                  .setNumber(result.phoneNumber)
                  .setPrimaryWelcomerPattern(result.userName),
              )
              .pipe(
                mergeMap((i) => {
                  return iif(
                    () => {
                      console.log('RESULT', result);
                      return !!result.settling;
                    },
                    this.smsClient
                      .sendPatternMessage(
                        new SmsPatternBuilder()
                          .setNumber(result.phoneNumber)
                          .setPrimaryHotelReservation(
                            result.userName,
                            result.settling?.hotel?.hotelName,
                            result.settling?.days,
                          ),
                      ),
                    new Observable((sub) => sub.next(i)),
                  );
                }),
              ),
            EMPTY,
          ).pipe(map(() => result));
        }),
      )
      .subscribe({
        next: (result) => {
          Logger.debug(result);
          res.redirect(`${this.config.redirectionLink}?code=${body.Status}`);
        },
        error: (e) => {
          Logger.error(e);
          res.redirect(`${this.config.redirectionLink}?code=${-1}`);
        },
      });
  }
}
