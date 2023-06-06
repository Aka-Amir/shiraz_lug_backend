import { Document } from 'mongoose';
import { MongoDocumentManager } from '../../@utils';
export declare class Comment {
    message: string;
}
export type CommentDocument = Comment & Document;
export declare const CommentDocumentManager: MongoDocumentManager<Comment>;
