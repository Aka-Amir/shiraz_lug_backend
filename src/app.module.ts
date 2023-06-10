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
      serveRoot: '',
    }),
    MongooseModule.forRoot('mongodb://event.shirazlug.ir', {
      user: 'shirazlu_abbs',
      pass: '@$h!R@_Z+l^G',
      dbName: 'shirazlu_shirazlug',
      auth: {
        password: '@$h!R@_Z+l^G',
        username: 'shirazlu_abbs',
      },
      authMechanism: 'DEFAULT',
      authSource: 'shirazlu_shirazlug',
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
