import { Type } from '@nestjs/common';
export declare class MongoDocumentManager<T> {
    private documentSchema;
    collectionName: string;
    readonly prefix = "col_";
    private _model;
    constructor(documentSchema: Type<T>);
    createModel(): any;
}
