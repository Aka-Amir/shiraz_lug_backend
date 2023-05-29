import { Module } from '@nestjs/common';
import { SettlingService } from './settling.service';
import { SettlingController } from './settling.controller';

@Module({
  controllers: [SettlingController],
  providers: [SettlingService]
})
export class SettlingModule {}
