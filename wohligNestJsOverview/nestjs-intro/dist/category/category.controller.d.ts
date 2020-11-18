import { Response } from "express";
import { CategoryService } from './category.service';
import { Category } from './category.model';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addProduct(requestBody: Category, res: Response): any;
}
