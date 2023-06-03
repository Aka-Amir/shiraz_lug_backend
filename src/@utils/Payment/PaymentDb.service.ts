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

  public create(transactionID: number, amount: number) {
    const document = new this.model({
      transactionID,
      transactionAmount: amount,
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
          },
        )
        .exec(),
    );
  }

  public findByID(id: string) {
    return from(this.model.findOne({ _id: id }, { __v: 0 }).exec());
  }

  public findByTrackingCode(code: string) {
    return from(this.model.findOne({ trackingCode: code }, { __v: 0 }).exec());
  }
}
