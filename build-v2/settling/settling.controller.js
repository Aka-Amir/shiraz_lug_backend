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
exports.SettlingController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const create_hotels_dto_1 = require("./dto/create-hotels.dto");
const create_settling_dto_1 = require("./dto/create-settling.dto");
const update_hotels_dto_1 = require("./dto/update-hotels.dto");
const update_settling_dto_1 = require("./dto/update-settling.dto");
const hotels_service_1 = require("./hotels.service");
const settling_service_1 = require("./settling.service");
let SettlingController = exports.SettlingController = class SettlingController {
    constructor(settlingService, hotelsService) {
        this.settlingService = settlingService;
        this.hotelsService = hotelsService;
    }
    create(createSettlingDto) {
        return this.settlingService
            .create(createSettlingDto)
            .pipe((0, rxjs_1.map)((item) => ({ _id: item._id.toString() })));
    }
    findAll() {
        return this.settlingService.findAll();
    }
    findOne(id) {
        return this.settlingService.findOne(id);
    }
    update(id, updateSettlingDto) {
        return this.settlingService.update(id, updateSettlingDto);
    }
    remove(id) {
        return this.settlingService.remove(id);
    }
    createHotel(dto) {
        return this.hotelsService
            .create(dto)
            .pipe((0, rxjs_1.map)((item) => ({ _id: item._id.toString() })));
    }
    findAllHotels() {
        return this.hotelsService.findAll().pipe((i) => {
            console.log(i);
            return i;
        });
    }
    findOneHotel(id) {
        return this.hotelsService.findOne(id);
    }
    updateHotel(id, dto) {
        return this.hotelsService.update(id, dto);
    }
    removeHotel(id) {
        return this.hotelsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('/reservations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_settling_dto_1.CreateSettlingDto]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/reservations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/reservations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('/reservations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_settling_dto_1.UpdateSettlingDto]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/reservations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/hotel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotels_dto_1.CreateHotelDto]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "createHotel", null);
__decorate([
    (0, common_1.Get)('/hotel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "findAllHotels", null);
__decorate([
    (0, common_1.Get)('/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "findOneHotel", null);
__decorate([
    (0, common_1.Put)('/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotels_dto_1.UpdateHotelDto]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "updateHotel", null);
__decorate([
    (0, common_1.Delete)('/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettlingController.prototype, "removeHotel", null);
exports.SettlingController = SettlingController = __decorate([
    (0, common_1.Controller)('api/settling'),
    __metadata("design:paramtypes", [settling_service_1.SettlingService,
        hotels_service_1.HotelsService])
], SettlingController);
//# sourceMappingURL=settling.controller.js.map