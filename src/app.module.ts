import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/shiraz_lug'), UsersModule, ServicesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
