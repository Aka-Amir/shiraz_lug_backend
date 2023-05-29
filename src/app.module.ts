import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/shiraz_lug'), UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
