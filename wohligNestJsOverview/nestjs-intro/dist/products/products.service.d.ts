import { Model } from 'mongoose';
import { Product } from './product.model';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    addProduct(productMainObj: object): {};
    getAllProducts(): {};
    getSingleProduct(productId: string): {};
    updateProduct(productId: string, title: string, desc: string, price: number): {};
    deleteProduct(prodId: string): {};
    private findProduct;
}
