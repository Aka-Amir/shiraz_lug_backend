import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { SettlingModule } from './settling/settling.module';
import { FoodsModule } from './foods/foods.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shirazlu_shirazlug', {
      user: 'shirazlu_abbs',
      pass: '@$h!R@_Z+l^G'
    }),
    UsersModule,
    SettlingModule,
    FoodsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
