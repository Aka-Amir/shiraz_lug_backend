import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { SettlingModule } from './settling/settling.module';
import { FoodsModule } from './foods/foods.module';
import { CommentsModule } from './comments/comments.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public_html'),
      serveRoot: ''
    }),
    MongooseModule.forRoot('mongodb://shirazlu_abbs:%40%24h!R%40_Z%2Bl%5EG@event.shirazlug.ir/?authMechanism=DEFAULT&authSource=shirazlu_shirazlug'),
    UsersModule,
    SettlingModule,
    FoodsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
