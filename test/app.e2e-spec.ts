import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userID = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create food', async () => {
    request(app.getHttpServer())
      .post('/foods')
      .send({
        foodSetDisplayName: 'kebab with salad and soda',
        food: 'kebab',
        desert: 'salad',
        drink: 'soda',
        price: 24000,
      })
    const foods = await request(app.getHttpServer()).get('/foods').expect(200);
    console.log(foods.body);
  });

  it('Payment Test', async () => {
    const createUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Amir',
        lastName: 'khalili',
        email: 'khaliliamir565@gmail.com',
        gender: 1,
        phoneNumber: '+989353756115',
        city: 'Shiraz',
      })
      .expect(201);
  });

});
