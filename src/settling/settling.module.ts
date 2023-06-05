import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotels, Settling } from './entities';
import { HotelsService } from './hotels.service';
import { SettlingController } from './settling.controller';
import { SettlingService } from './settling.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Settling.SettlingDocumentManager.collectionName,
        schema: Settling.SettlingDocumentManager.createModel(),
      },
      {
        name: Hotels.HotelsDocumentManager.collectionName,
        schema: Hotels.HotelsDocumentManager.createModel(),
      },
    ]),
  ],
  controllers: [SettlingController],
  providers: [SettlingService, HotelsService],
  exports: [SettlingService],
})
export class SettlingModule {
}
