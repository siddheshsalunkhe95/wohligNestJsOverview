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
var _a, _b, _c;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const lodash_1 = require("lodash");
const benchmark_Interceptor_1 = require("../interceptors/benchmark.Interceptor");
const products_service_1 = require("./products.service");
const addProduct_decorator_1 = require("../decorators/addProduct.decorator");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async addProduct(requestBody, res) {
        const resultVal = await this.productsService.addProduct(requestBody);
        if (!lodash_1._.isEmpty(resultVal)) {
            res.status(common_1.HttpStatus.OK).send(resultVal);
        }
        else {
            res.status(common_1.HttpStatus.NO_CONTENT).json([]);
        }
    }
    async customDecoratorMethod(requestBody, res) {
        const resultVal = await this.productsService.addProduct(requestBody);
        if (!lodash_1._.isEmpty(resultVal)) {
            res.status(common_1.HttpStatus.OK).send(resultVal);
        }
        else {
            res.status(common_1.HttpStatus.NO_CONTENT).json([]);
        }
    }
    async getAllProducts(res) {
        const products = await this.productsService.getAllProducts();
        if (products && products.length > 0) {
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: "Success",
                data: products
            });
        }
        else {
            return res.status(common_1.HttpStatus.NO_CONTENT).json({
                success: false,
                message: "Error",
                data: []
            });
        }
    }
    getSingleProduct(prodId) {
        return this.productsService.getSingleProduct(prodId);
    }
    async updateProduct(prodId, prodTitle, prodDesc, prodPrice) {
        const updatedProd = await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return updatedProd;
    }
    async deleteProduct(prodId) {
        const result = await this.productsService.deleteProduct(prodId);
        return result;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    common_1.Post('/createProduct'),
    __param(0, addProduct_decorator_1.createProductDecorator()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "customDecoratorMethod", null);
__decorate([
    common_1.Get(),
    common_1.UseInterceptors(benchmark_Interceptor_1.BenchmarkInterceptor),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getSingleProduct", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('title')),
    __param(2, common_1.Body('description')),
    __param(3, common_1.Body('price')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map