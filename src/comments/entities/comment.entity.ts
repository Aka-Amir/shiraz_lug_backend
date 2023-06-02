import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoDocumentManager } from 'src/@utils';

@Schema()
export class Comment {
    @Prop({
        required: true,
        type: String
    })
    message: string;
}

export type CommentDocument = Comment & Document;
export const CommentDocumentManager = new MongoDocumentManager(Comment);
