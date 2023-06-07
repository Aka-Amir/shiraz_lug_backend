import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaymentDocument,
  PaymentDocumentManager,
} from './entity/Payment.entity';
import { Model } from 'mongoose';
import { GateResponse } from './types/gateResponse.type';
import { from } from 'rxjs';

@Injectable()
export class PaymentDbService {
  constructor(
    @InjectModel(PaymentDocumentManager.collectionName)
    private readonly model: Model<PaymentDocument>,
  ) {}

  public create(trackingCode: string, transactionID: number, amount: number, userID: string) {
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
            trackingCode: gateWayResponse.tracking_code,
            transactionAmount: gateWayResponse.transactionAmount,
            refNum: gateWayResponse.RefNum,
            customerRefNum: gateWayResponse.CustomerRefNum,
            cardHashPan: gateWayResponse.CardHashPan,
            cardMaskPan: gateWayResponse.CardMaskPan,
            date: gateWayResponse.datefield,
            $set: {
              status: gateWayResponse.Status,
            }
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
}
