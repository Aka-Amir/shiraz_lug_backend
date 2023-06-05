import { IMessagePayload } from './IMessagePayload';

export interface ICommercialMessagePayload
  extends Omit<IMessagePayload, 'user'> {
  uname: string;
  from: string;
  to: string[];
  message: string;
}
