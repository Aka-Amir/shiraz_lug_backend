import { Module } from '@nestjs/common';
import { SettlingService } from './settling.service';
import { SettlingController } from './settling.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotels, Settling } from './entities';
import { HotelsService } from './hotels.service';

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
})
export class SettlingModule {}
