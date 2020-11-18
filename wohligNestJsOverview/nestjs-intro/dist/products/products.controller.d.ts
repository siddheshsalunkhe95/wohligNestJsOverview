import { Response } from "express";
import { ProductsService } from './products.service';
import { Product } from './product.model';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(requestBody: Product, res: Response): any;
    customDecoratorMethod(requestBody: Product, res: Response): any;
    getAllProducts(res: Response): {};
    getSingleProduct(prodId: string): {};
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): {};
    deleteProduct(prodId: string): {};
}
