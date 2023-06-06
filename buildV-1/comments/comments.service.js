"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_entity_1 = require("./entities/comment.entity");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
let CommentsService = exports.CommentsService = class CommentsService {
    constructor(model) {
        this.model = model;
    }
    create(createCommentDto) {
        const newCommentDocument = new this.model({
            message: createCommentDto.message,
        });
        return (0, rxjs_1.from)(newCommentDocument.save());
    }
    findAll() {
        return (0, rxjs_1.from)(this.model.find({}, { __v: 0 }).exec());
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.model.findOne({ _id: id }, { __v: 0 }).exec());
    }
    update(id, updateCommentDto) {
        return (0, rxjs_1.from)(this.model
            .updateOne({ _id: id }, Object.assign({}, JSON.parse(JSON.stringify(updateCommentDto))))
            .exec());
    }
    remove(id) {
        return (0, rxjs_1.from)(this.model.deleteOne({ _id: id }).exec());
    }
};
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_entity_1.CommentDocumentManager.collectionName)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsService);
//# sourceMappingURL=comments.service.js.map