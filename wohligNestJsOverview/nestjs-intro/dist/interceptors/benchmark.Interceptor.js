"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let BenchmarkInterceptor = class BenchmarkInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        console.log('Endpoint: ', request.url);
        console.log('Method: ', request.method);
        const now = Date.now();
        return next
            .handle()
            .pipe(operators_1.tap(() => console.log(`Execution Time: ${Date.now() - now}ms`)));
    }
};
BenchmarkInterceptor = __decorate([
    common_1.Injectable()
], BenchmarkInterceptor);
exports.BenchmarkInterceptor = BenchmarkInterceptor;
//# sourceMappingURL=benchmark.Interceptor.js.map