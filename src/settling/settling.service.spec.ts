import { Test, TestingModule } from '@nestjs/testing';
import { SettlingService } from './settling.service';

describe('SettlingService', () => {
  let service: SettlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettlingService],
    }).compile();

    service = module.get<SettlingService>(SettlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
