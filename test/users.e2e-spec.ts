import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';

describe('UsersController (e2e) user lifecycle', () => {
  let app: INestApplication;
  let userID: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
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

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((s) => {
        console.log(s.body);
        expect(
          (s.body as Array<any>).findIndex((item) => item._id === userID),
        ).toBeGreaterThan(-1);
      });
  });

  it('/users (PUT)', () => {
    return request(app.getHttpServer())
      .put('/users/' + userID)
      .send({
        firstName: 'mamad',
      })
      .expect(200)
      .then((s) => {
        console.log(s.body);
        expect(s.body).not.toBeFalsy();
      });
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/' + userID)
      .expect(200)
      .then((s) => {
        console.log(s.body);
        expect(s.body.firstName).toBe('mamad');
      });
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/' + userID)
      .then((s) => {
        console.log(s.body);
        expect(s.statusCode).toBeGreaterThanOrEqual(200);
      });
  });
});
