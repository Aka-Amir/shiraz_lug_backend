import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SettlingModule } from './../src/settling/settling.module';

describe('UsersController (e2e) user lifecycle', () => {
  let app: INestApplication;
  const HOTELS_END_POINT = '/settling/hotel';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SettlingModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`${HOTELS_END_POINT} (POST)`, () => {
    return request(app.getHttpServer())
      .post(HOTELS_END_POINT)
      .send({
        hotelName: 'test',
        address: 'Shiraz',
        contactNumber: '+989353756115',
        perDayPrice: 1000,
      })
      .expect(201)
      .then((s) => {
        console.log(s.body);
        expect(s.body).not.toBeFalsy();
      });
  });

  it(`${HOTELS_END_POINT} (GET)`, () => {
    return request(app.getHttpServer())
      .get(HOTELS_END_POINT)
      .expect(200)
      .then((s) => {
        console.log(s.body);
        expect((s.body as Array<any>).length).toBeGreaterThan(0);
      });
  });
});
