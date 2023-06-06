"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodsModule = void 0;
const common_1 = require("@nestjs/common");
const foods_service_1 = require("./foods.service");
const foods_controller_1 = require("./foods.controller");
const food_entity_1 = require("./entities/food.entity");
const mongoose_1 = require("@nestjs/mongoose");
let FoodsModule = exports.FoodsModule = class FoodsModule {
};
exports.FoodsModule = FoodsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: food_entity_1.FoodDocumentManager.collectionName,
                    schema: food_entity_1.FoodDocumentManager.createModel(),
                },
            ]),
        ],
        controllers: [foods_controller_1.FoodsController],
        providers: [foods_service_1.FoodsService],
    })
], FoodsModule);
//# sourceMappingURL=foods.module.js.map