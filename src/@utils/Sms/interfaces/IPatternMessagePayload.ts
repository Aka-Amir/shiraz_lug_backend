import { IMessagePayload } from "./IMessagePayload";

export interface IPatternMessagePayload extends IMessagePayload {
  fromNum: string;
  toNum: string;
  patternCode: string;
  inputData: object[];
}
