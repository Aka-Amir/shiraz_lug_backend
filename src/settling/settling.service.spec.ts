import { Test, TestingModule } from '@nestjs/testing';
import { SettlingService } from './settling.service';
import { firstValueFrom } from 'rxjs';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotels, Settling } from './entities';

describe('SettlingService', () => {
  let service: SettlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/shiraz_lug'),
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
      providers: [SettlingService],
    }).compile();

    service = module.get<SettlingService>(SettlingService);
  });

  it('should be defined', () => {
    expect(
      firstValueFrom(service.findByUserID('647af100596068c366257dcf')).then(
        (r) => {
          console.log(r);
          return r;
        },
      ),
    ).toBeDefined();
  });
});
