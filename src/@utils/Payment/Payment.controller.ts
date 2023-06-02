import { Body, Controller, Get, Inject, Param, Post, Redirect, Res } from '@nestjs/common';
import { PaymentService } from './Payment.service';
import { GateResponse } from './types/gateResponse.type';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.consts';
import { IPaymentConfig } from './IPaymentConfig';

@Controller('payment')
export class PaymentController {
  constructor(
    private service: PaymentService,
    @Inject(PAYMENT_CONFIG_PROVIDER) private config: IPaymentConfig,
  ) {}
  @Get(':amount')
  private testModule(@Param() amount: string, @Res() res) {
    this.service.createTransaction(((+amount) || 10000) * 10)
    .subscribe({
        next(value) {
            res.redirect(value.url);
        },
        error(e) {
            console.log(e);
        }
    });
  }

  @Post()
  private test(@Body() body: GateResponse, @Res() res) {
    res.redirect(`${this.config.redirectionLink}?code=${body.Status}`);
    return {
      message: true,
    };
  }
}
