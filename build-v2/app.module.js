"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const settling_module_1 = require("./settling/settling.module");
const foods_module_1 = require("./foods/foods.module");
const comments_module_1 = require("./comments/comments.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public_html'),
                serveRoot: ''
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://event.shirazlug.ir', {
                user: 'shirazlu_abbs',
                pass: '@$h!R@_Z+l^G',
                dbName: 'shirazlu_shirazlug',
                auth: {
                    password: '@$h!R@_Z+l^G',
                    username: 'shirazlu_abbs',
                },
                authMechanism: 'DEFAULT',
                authSource: "shirazlu_shirazlug"
            }),
            users_module_1.UsersModule,
            settling_module_1.SettlingModule,
            foods_module_1.FoodsModule,
            comments_module_1.CommentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map