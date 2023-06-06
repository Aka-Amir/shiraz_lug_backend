import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userID = '647ee82b4d1049ec73c0155b';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Amir',
        lastName: 'khalili',
        email: 'khaliliamir565@gmail.com',
        gender: 1,
        phoneNumber: '+989353756115',
        city: 'Shiraz',
      })
      .expect(201)
      .then((s) => {
        userID = s.body.ID;
        console.log(s.body);
        expect(userID).not.toBeFalsy();
      });
  });

  it('Resend Code', () => {
    return request(app.getHttpServer())
      .post('/users/resend_code')
      .send({ id: userID })
      .expect(201)
      .then((r) => {
        request(app.getHttpServer())
          .post('/users/resend_code')
          .send({ id: userID })
          .expect(400);
      });
  });
});
