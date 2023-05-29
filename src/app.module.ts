import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { SettlingModule } from './settling/settling.module';
import { FoodsModule } from './foods/foods.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/shiraz_lug'), UsersModule, SettlingModule, FoodsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
