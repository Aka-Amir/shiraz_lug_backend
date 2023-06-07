import { DynamicModule } from '@nestjs/common';
import { IPaymentConfig } from './IPaymentConfig';
export declare class PaymentModule {
    static register(config: IPaymentConfig): DynamicModule;
}
