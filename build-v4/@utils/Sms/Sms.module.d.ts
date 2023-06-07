import { DynamicModule } from '@nestjs/common';
import { ISmsConfig } from './interfaces';
export declare class SmsModule {
    static register(config: ISmsConfig): DynamicModule;
}
