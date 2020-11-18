"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.createProductDecorator = common_1.createParamDecorator((data, req) => {
    return data ? req.body && req.body[data] : req.body;
});
//# sourceMappingURL=addProduct.decorator.js.map