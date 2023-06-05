import { DynamicModule, Module } from '@nestjs/common';
import { SmsService } from './Sms.service';
import { ISmsConfig } from './interfaces';
import { HttpModule } from '@nestjs/axios';

@Module({})
export class SmsModule {
  static register(config: ISmsConfig): DynamicModule {
    return {
      module: SmsModule,
      imports: [HttpModule],
      providers: [
        {
          provide: 'SMS_CONFIG',
          useValue: config,
        },
        SmsService,
      ],
      exports: [SmsService],
    };
  }
}
