import { Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { Observable, iif, map, mergeMap } from 'rxjs';
import { SettlingService } from '../../settling/settling.service';
import { SmsPatternBuilder, SmsService } from '../Sms';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { PaymentService } from './Payment.service';
import { GateResponse } from './types/gateResponse.type';

@Controller('api/payment')
export class PaymentController {
  constructor(
    private service: PaymentService,
    private smsClient: SmsService,
    private settling: SettlingService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private readonly config: IPaymentConfig,
  ) {}

  @Get()
  verify(@Query() query: GateResponse, @Res() res) {
    return this.service.db
      .findByTrackingCode(query.trackId)
      .pipe(
        mergeMap((item) => {
          let obs = new Observable((s) =>
            s.next({
              status: query.status,
            }),
          );

          if (query.success == 0) {
            obs = this.service.verifyTransaction(item.trackingCode);
          }
          return obs.pipe(
            map((data: any) => ({
              user: item.user,
              _id: item._id,
              status: data.status,
            })),
          );
        }),
      )
      .pipe(
        mergeMap((item) => {
          return this.service.db
            .appendTransactionDetails(item._id.toString(), {
              ...query,
              status: item.status,
            })
            .pipe(
              map(() => {
                if (query.success == 0) {
                  throw new Error('Payment Failed');
                }
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
          return this.smsClient
            .sendPatternMessage(
              new SmsPatternBuilder()
                .setNumber(result.phoneNumber)
                .setPrimaryWelcomerPattern(result.userName),
            )
            .pipe(
              mergeMap((i) => {
                return iif(
                  () => {
                    return !!result.settling;
                  },
                  this.smsClient.sendPatternMessage(
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
            )
            .pipe(map(() => result));
        }),
      )
      .subscribe({
        next: (result) => {
          res.redirect(
            `${this.config.redirectionLink}?code=${query.status}&payment=true`,
          );
        },
        error: (e) => {
          res.redirect(
            `${this.config.redirectionLink}?code=${-1}&payment=true`,
          );
        },
      });
  }
}
