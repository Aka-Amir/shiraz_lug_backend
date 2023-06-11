import { Inject, Injectable } from '@nestjs/common';
import {
  ICommercialMessagePayload,
  IPatternMessagePayload,
  ISmsConfig,
} from './interfaces';
import { SmsPatternBuilder } from './SmsPatternBuilder';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SmsService {
  private readonly URL = 'http://ippanel.com/api/select';
  //   private readonly URL = 'http://ippanel.com/api/select';
  constructor(
    @Inject('SMS_CONFIG') private readonly config: ISmsConfig,
    private readonly httpService: HttpService,
  ) {}

  public sendPatternMessage(smsData: SmsPatternBuilder) {
    return this._sendPatternMessage({
      op: 'pattern',
      fromNum: this.config.number,
      pass: this.config.password,
      user: this.config.username,
      ...smsData.result,
    });
  }

  public sendCommercialMessage(message: string, numbers: string[]) {
    return this._sendCommercialMessage({
      from: this.config.number,
      uname: this.config.username,
      pass: this.config.password,
      message,
      op: 'send',
      to: numbers,
    });
  }

  private _sendPatternMessage(payload: IPatternMessagePayload) {
    if (payload.op !== 'pattern') throw new Error('Invalid operation');
    return this.httpService.post(this.URL, payload);
  }

  private _sendCommercialMessage(payload: ICommercialMessagePayload) {
    if (payload.op !== 'send') throw new Error('Invalid operation');
    return this.httpService.post(this.URL, payload);
  }
}
