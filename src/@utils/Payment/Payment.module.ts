import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { PaymentController } from './Payment.controller';
import { PaymentService } from './Payment.service';
import { PaymentDbService } from './PaymentDb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentDocumentManager } from './entity/Payment.entity';

@Module({})
export class PaymentModule {
  static register(config: IPaymentConfig): DynamicModule {
    return {
      module: PaymentModule,
      imports: [
        HttpModule,
        MongooseModule.forFeature([
          {
            name: PaymentDocumentManager.collectionName,
            schema: PaymentDocumentManager.createModel(),
          },
        ]),
      ],
      controllers: [PaymentController],
      providers: [
        {
          provide: PAYMENT_CONFIG_PROVIDER,
          useValue: config,
        },
        PaymentService,
        PaymentDbService,
      ],
      exports: [PaymentService],
    };
  }
}
