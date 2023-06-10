import { DynamicModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DocumentManager } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from '../@utils/Payment';
import { SmsModule } from '../@utils/Sms';
import { SettlingModule } from '../settling/settling.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'col_users',
        schema: DocumentManager.createModel(),
      },
    ]),
    PaymentModule.register({
      // apiKey: 'Y35HLNuPJmfG8FY3o3', //'0ktFBxNVj2Beel_NVA',
      // secretKey: 'Ttbhtay53jH7uoWjEbt2', //'pgno6T3Gs4ef7p2812Ec',
      merchant: 'zibal',
      redirectionLink: 'https://event.shirazlug.ir/',
    }),
    SmsModule.register({
      number: '3000505',
      password: '27385Tky',
      username: '2283220531',
      apiKey: 'FceUMKBKCGXpptKBPjgOelXpjX1XOCnstkWUD5eXzH0=',
    }),
    SettlingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  static registerService(): DynamicModule {
    return {
      module: UsersModule,
      providers: [UsersService],
      exports: [UsersService],
    };
  }
}
