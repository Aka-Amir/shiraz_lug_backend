import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateSettlingDto {
  @IsNotEmpty({
    message: 'userID_is_empty',
  })
  userID: string;

  @IsNotEmpty({
    message: 'hotelID_is_empty',
  })
  hotelID: string;

  @Min(1, {
    message: 'invalid_days'
  })
  @Max(30, {
    message: 'exceeded_limit_days'
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  }, {
    message: 'invalid_days'
  })
  days: number;
}
