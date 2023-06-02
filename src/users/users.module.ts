import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DocumentManager } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from '../@utils/Payment';
import { SettlingModule } from 'src/settling/settling.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentManager.collectionName,
        schema: DocumentManager.createModel(),
      },
    ]),
    PaymentModule.register({
      apiKey: '0ktFBxNVj2Beel_NVA',
      secretKey: 'pgno6T3Gs4ef7p2812Ec',
      redirectionLink: '',
    }),
    SettlingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
