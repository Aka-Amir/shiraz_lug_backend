import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty({
    message: 'foodSetDisplayName_is_empty',
  })
  foodSetDisplayName: string;

  @IsNotEmpty({
    message: 'food_is_empty',
  })
  food: string;

  desert?: string;

  @IsNotEmpty({
    message: 'drink_is_empty',
  })
  drink: string;

  @Min(0, {
    message: 'price_is_tooLow',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: 'price_is_empty',
    },
  )
  price: number;
}
