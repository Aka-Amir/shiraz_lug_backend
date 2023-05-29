import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SettlingModule } from './../src/settling/settling.module';

describe('UsersController (e2e) user lifecycle', () => {
  let app: INestApplication;
  const SETTLING_END_POINT = '/settling/reservations';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SettlingModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`${SETTLING_END_POINT} (POST)`, () => {
    return request(app.getHttpServer())
      .post(SETTLING_END_POINT)
      .send({
        userID: '647468538a63f05c1eba6225',
        hotelID: '6474645bf1d90e8f56a01f21',
        days: 3
      })
      .expect(201)
      .then(s => {
        console.log(s.body);
      });
  });
});
