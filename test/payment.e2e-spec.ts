import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Payment (e2e)', () => {
  let app: INestApplication;
  const info = {
    hotelID: '',
    userId: '',
    foodID: '',
    settlingID: '',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create Food', () => {
    request(app.getHttpServer())
      .post('/foods')
      .send({
        foodSetDisplayName: 'kebab with salad and soda',
        food: 'kebab',
        desert: 'salad',
        drink: 'soda',
        price: 24000,
      })
      .then((response) => {
        expect(response.body.ID).toBeDefined();
        console.log(response.body);
        info.foodID = response.body.ID as string;
      });
  });

  it('Create Hotel', () => {
    return request(app.getHttpServer())
      .post('/settling/hotel')
      .send({
        hotelName: 'A hotel',
        address: 'shiraz',
        contactNumber: '09353756115',
        perDayPrice: 10000,
      })
      .then((response) => {
        expect(response.body._id).not.toBeFalsy();
        info.hotelID = response.body._id as string;
      });
  });

  it('Create user', () => {
    console.log(info.foodID);
    return request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Amir',
        lastName: 'Khalili',
        email: 'khaliliamir565@gmail.com',
        gender: 1,
        phoneNumber: '09353756115',
        city: 'shiraz',
        orderedFood: info.foodID,
        needTaxi: true,
        presenceTime: '6h',
      })
      .then((response) => {
        expect(response.body.ID).not.toBeFalsy();
        info.userId = response.body.ID as string;
      });
  });

  it('Set settling', () => {
    return request(app.getHttpServer())
      .post('/settling/reservations')
      .send({
        userID: info.userId,
        hotelID: info.hotelID,
        days: 2,
      })
      .then((response) => {
        expect(response.body._id).not.toBeFalsy();
        info.settlingID = response.body._id as string;
      });
  });

  it('Payment Test', () => {
    return request(app.getHttpServer())
      .get('/users/pay/' + info.userId)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.url).toBeDefined();
        console.log(response.body.url);
      });
  });
});
