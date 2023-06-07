"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const entities_1 = require("./entities");
const hotels_service_1 = require("./hotels.service");
const settling_controller_1 = require("./settling.controller");
const settling_service_1 = require("./settling.service");
let SettlingModule = exports.SettlingModule = class SettlingModule {
};
exports.SettlingModule = SettlingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: entities_1.Settling.SettlingDocumentManager.collectionName,
                    schema: entities_1.Settling.SettlingDocumentManager.createModel(),
                },
                {
                    name: entities_1.Hotels.HotelsDocumentManager.collectionName,
                    schema: entities_1.Hotels.HotelsDocumentManager.createModel(),
                },
            ]),
        ],
        controllers: [settling_controller_1.SettlingController],
        providers: [settling_service_1.SettlingService, hotels_service_1.HotelsService],
        exports: [settling_service_1.SettlingService],
    })
], SettlingModule);
//# sourceMappingURL=settling.module.js.map