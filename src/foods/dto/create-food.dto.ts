import { IsNotEmpty } from "class-validator";

export class CreateFoodDto {

    @IsNotEmpty({
        message: 'foodSetDisplayName_is_empty'
    })
    foodSetDisplayName: string;

    @IsNotEmpty({
        message: 'food_is_empty'
    })
    food: string;

    desert?: string;

    @IsNotEmpty({
        message: 'drink_is_empty'
    })
    drink: string;
}
