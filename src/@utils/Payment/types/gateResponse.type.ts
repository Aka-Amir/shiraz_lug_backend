export type GateResponse = {
  Status: number;
  RefNum: number;
  CustomerRefNum: number;
  tracking_code: string;
  transactionAmount: number;
  CardHashPan: string;
  CardMaskPan: string;
  datefield: number;
};
