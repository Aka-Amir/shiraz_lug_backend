import { IsNotEmpty, Min, IsNumber } from 'class-validator';
export class CreateHotelDto {
  @IsNotEmpty({
    message: 'hotelName_is_empty',
  })
  hotelName: string;

  @IsNotEmpty({
    message: 'address_is_empty',
  })
  address: string;

  @IsNotEmpty({
    message: 'contactNumber_is_empty',
  })
  contactNumber: string;

  @Min(0, {
    message: 'invalid_price',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'invalid_price',
    },
  )
  perDayPrice: number;
}
