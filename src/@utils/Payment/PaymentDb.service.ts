import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import {
  PaymentDocument,
  PaymentDocumentManager,
} from './entity/Payment.entity';
import { GateResponse } from './types/gateResponse.type';

@Injectable()
export class PaymentDbService {
  constructor(
    @InjectModel(PaymentDocumentManager.collectionName)
    private readonly model: Model<PaymentDocument>,
  ) {}

  public create(
    trackingCode: string,
    transactionID: string,
    amount: number,
    userID: string,
  ) {
    const document = new this.model({
      transactionID,
      transactionAmount: amount,
      trackingCode,
      user: userID,
    });
    return from(document.save());
  }

  public appendTransactionDetails(
    paymentID: string,
    gateWayResponse: GateResponse,
  ) {
    return from(
      this.model
        .updateOne(
          { _id: paymentID },
          {
            $set: {
              status: gateWayResponse.status,
              date: Date.now(),
            },
          },
        )
        .exec(),
    );
  }

  public findByID(id: string) {
    return from(
      this.model
        .findOne({ _id: id }, { __v: 0 })
        .populate('user', { __v: 0 })
        .exec(),
    );
  }

  public findByTrackingCode(code: string) {
    return from(
      this.model
        .findOne({ trackingCode: code }, { __v: 0 })
        .populate('user', { __v: 0 })
        .populate('user.settling', { __v: 0 })
        .populate('user.settling.hotel', { __v: 0 })
        .exec(),
    );
  }

  public getPaymentRciepts(userID: string) {
    return from(
      this.model
        .find(
          {
            user: userID
          },
          { __v: 0 },
        )
        .exec(),
    );
  }

  public getSuccessPaymentRciepts(userID: string) {
    return from(
      this.model
        .find(
          {
            $and: [{ user: userID }, { status: 2 }],
          },
          { __v: 0 },
        )
        .exec(),
    );
  }
}
