import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GateResponse } from '../src/@utils/Payment/types/gateResponse.type'

const phone = "09353756115";
const firstName = "امیر";
const lastName = "خلیلی";

describe('Payment Without settling (e2e)', () => {
  let app: INestApplication;
  const info = {
    hotelID: '',
    userId: '',
    foodID: '',
    settlingID: '',
    token: '',
    amount: 0
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
        firstName,
        lastName,
        email: 'khaliliamir565@gmail.com',
        gender: 1,
        phoneNumber: phone,
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

  it('Payment Test', () => {
    return request(app.getHttpServer())
      .get('/users/pay/' + info.userId)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.url).toBeDefined();
        info.token = response.body.token;
        info.amount = response.body.amount;
        console.log(response.body.url);
      });
  });

  it('gate test', async () => {
    const body : GateResponse = {
      CardHashPan: 'xxxx',
      CardMaskPan: 'xxxx',
      CustomerRefNum: 2,
      datefield: Date.now(),
      Status: 3,
      RefNum: 2,
      tracking_code: info.token,
      transactionAmount: info.amount
    };

    console.log(info.token)
    const gate = await request(app.getHttpServer())
      .post('/payment')
      .send(body);

    expect(gate.status).toBeGreaterThan(299);
  })
});

describe('Payment With settling (e2e)', () => {
  let app: INestApplication;
  const info = {
    hotelID: '',
    userId: '',
    foodID: '',
    settlingID: '',
    token: '',
    amount: 0
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
        firstName,
        lastName,
        email: 'khaliliamir565@gmail.com',
        gender: 1,
        phoneNumber: phone,
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
        info.token = response.body.token;
        info.amount = response.body.amount;
        console.log(response.body.url);
      });
  });

  it('gate test', async () => {
    const body : GateResponse = {
      CardHashPan: 'xxxx',
      CardMaskPan: 'xxxx',
      CustomerRefNum: 2,
      datefield: Date.now(),
      Status: 3,
      RefNum: 2,
      tracking_code: info.token,
      transactionAmount: info.amount
    };

    console.log(info.token)
    const gate = await request(app.getHttpServer())
      .post('/payment')
      .send(body);

    expect(gate.status).toBeGreaterThan(299);
  })
});