import { Module } from '@nestjs/common';
import { SettlingService } from './settling.service';
import { SettlingController } from './settling.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotels, Settling } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Settling.SettlingDocumentManager.collectionName,
        schema: Settling.Settling,
      },
      {
        name: Hotels.HotelsDocumentManager.collectionName,
        schema: Hotels.Hotels,
      },
    ]),
  ],
  controllers: [SettlingController],
  providers: [SettlingService],
})
export class SettlingModule {}
