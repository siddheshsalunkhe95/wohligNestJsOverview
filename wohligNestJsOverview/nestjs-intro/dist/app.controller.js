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
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const http_exception_filter_1 = require("./exceptionFilters/http-exception.filter");
const own_error_filter_1 = require("./exceptionFilters/own-error.filter");
const roles_decorator_1 = require("./guards/roles.decorator");
const roles_guard_1 = require("./guards/roles.guard");
class ForbiddenException extends common_1.HttpException {
    constructor() {
        super('Forbidden', common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    greetingMsg() {
        return this.appService.greetingMsg();
    }
    validateQueryString(idval) {
        return this.appService.validateQueryString(idval);
    }
    async uuidValidation(uuid) {
        return this.appService.validateUuidString(uuid);
    }
    async exceptionFilter() {
        throw new ForbiddenException();
    }
    async exceptionFilterFile() {
        throw new ForbiddenException();
    }
    async exceptionFilterOwnError() {
        throw new own_error_filter_1.OwnError();
    }
    async guardsExample() {
        return this.appService.guardsExample();
    }
    async guardsWithCustomDecoratorExample() {
        return this.appService.guardsExample();
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('Content-Type', 'text/html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "greetingMsg", null);
__decorate([
    common_1.Get("/query"),
    __param(0, common_1.Query('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AppController.prototype, "validateQueryString", null);
__decorate([
    common_1.Get('/string/:uuid'),
    __param(0, common_1.Param('uuid', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uuidValidation", null);
__decorate([
    common_1.Get('/exceptionFilter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exceptionFilter", null);
__decorate([
    common_1.Get('/exceptionFilterFile'),
    common_1.UseFilters(new http_exception_filter_1.HttpExceptionFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exceptionFilterFile", null);
__decorate([
    common_1.Get('/exceptionFilterOwnError'),
    common_1.UseFilters(new own_error_filter_1.OwnErrorFilter()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exceptionFilterOwnError", null);
__decorate([
    common_1.Get('/guardsExample'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.SetMetadata('roles', 'admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "guardsExample", null);
__decorate([
    common_1.Get('/guardsWithCustomDecoratorExample'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "guardsWithCustomDecoratorExample", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map