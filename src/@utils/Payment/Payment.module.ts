import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.consts';
import { PaymentController } from './Payment.controller';
import { PaymentService } from './Payment.service';

@Module({
})
export class PaymentModule {
  static register(config: IPaymentConfig): DynamicModule {
    return {
      module: PaymentModule,
      imports: [HttpModule],
      controllers: [PaymentController],
      providers: [
        {
          provide: PAYMENT_CONFIG_PROVIDER,
          useValue: config,
        },
        PaymentService,
      ],
      exports: [PaymentService],
    };
  }
}
