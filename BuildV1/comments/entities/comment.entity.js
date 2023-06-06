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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDocumentManager = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const _utils_1 = require("../../@utils");
let Comment = exports.Comment = class Comment {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Comment.prototype, "message", void 0);
exports.Comment = Comment = __decorate([
    (0, mongoose_1.Schema)()
], Comment);
exports.CommentDocumentManager = new _utils_1.MongoDocumentManager(Comment);
//# sourceMappingURL=comment.entity.js.map