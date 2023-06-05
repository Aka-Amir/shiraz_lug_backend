import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
import { PAYMENT_CONFIG_PROVIDER } from './Payment.constants';
import { PaymentController } from './Payment.controller';
import { PaymentService } from './Payment.service';
import { PaymentDbService } from './PaymentDb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentDocumentManager } from './entity/Payment.entity';
import { SmsModule } from '../Sms';
import { SettlingModule } from '../../settling/settling.module';

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
        SmsModule.register({
          number: '10004223',
          password: '27385Tky',
          username: '2283220531',
          apiKey: 'FceUMKBKCGXpptKBPjgOelXpjX1XOCnstkWUD5eXzH0=',
        }),
        SettlingModule,
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
