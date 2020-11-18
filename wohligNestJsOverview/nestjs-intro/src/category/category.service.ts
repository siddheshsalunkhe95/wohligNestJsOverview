import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './category.model';
import { Product } from '../products/product.model';


@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async addCategory(productMainObj: object) {
        // its for testing purpose.
        // 1) first we get all data available in products collection. 
        // 2) save request body data category collection. 
        // step 1) and step 2) both are independant
        const products = await this.productModel.find().exec();
        console.log("products--------->", products);

        const newProduct = new this.categoryModel(productMainObj);
        const result = await newProduct.save();
        return result;
    }



}
