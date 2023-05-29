import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export class MongoDocumentManager<T> {
  public readonly collectionName: string;
  public readonly prefix = 'col_';

  private _model: any = null;

  constructor(private documentSchema: Type<T>) {
    this.collectionName = `${this.prefix}${documentSchema.name}`;
  }

  public createModel() {
    if (this._model === null)
      this._model = SchemaFactory.createForClass(this.documentSchema);
    return this._model;
  }
}
