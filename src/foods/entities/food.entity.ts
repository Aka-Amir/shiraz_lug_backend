import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { MongoDocumentManager } from 'src/@utils';
@Schema()
export class Food {
    @Prop({
        required: true,
        type: String,
    })
    foodSetDisplayName: string;

    @Prop({
        required: true,
        type: String,
    })
    food: string;

    @Prop({
        required: false,
        type: String,
    })
    desert: string;

    @Prop({
        required: true,
        type: String,
    })
    drink: string;
}

export type FoodDocument = Food & Document;
export const FoodDocumentManager = new MongoDocumentManager(Food);
