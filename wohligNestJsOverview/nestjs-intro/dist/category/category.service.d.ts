import { Model } from 'mongoose';
import { Category } from './category.model';
import { Product } from '../products/product.model';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly productModel;
    constructor(categoryModel: Model<Category>, productModel: Model<Product>);
    addCategory(productMainObj: object): {};
}
