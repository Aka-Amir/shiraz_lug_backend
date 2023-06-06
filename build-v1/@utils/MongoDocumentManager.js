"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDocumentManager = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class MongoDocumentManager {
    constructor(documentSchema) {
        this.documentSchema = documentSchema;
        this.prefix = 'col_';
        this._model = null;
        this.collectionName = `${this.prefix}${documentSchema.name.toLowerCase()}`;
    }
    createModel() {
        if (this._model === null)
            this._model = mongoose_1.SchemaFactory.createForClass(this.documentSchema);
        return this._model;
    }
}
exports.MongoDocumentManager = MongoDocumentManager;
//# sourceMappingURL=MongoDocumentManager.js.map