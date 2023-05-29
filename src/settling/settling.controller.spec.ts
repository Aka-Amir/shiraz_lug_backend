import { Test, TestingModule } from '@nestjs/testing';
import { SettlingController } from './settling.controller';
import { SettlingService } from './settling.service';

describe('SettlingController', () => {
  let controller: SettlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettlingController],
      providers: [SettlingService],
    }).compile();

    controller = module.get<SettlingController>(SettlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
