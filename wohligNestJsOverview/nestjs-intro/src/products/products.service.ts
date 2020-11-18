import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }


  /**************************** add operation ****************************/
  /* async addProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    // return result.id as string;
    return result;
  } */


  async addProduct(productMainObj: object) {
    const newProduct = new this.productModel(productMainObj);
    const result = await newProduct.save();
    return result;
  }


  /**************************** get operation ****************************/
  async getAllProducts() {
    const products = await this.productModel.find().exec();
    if (products && products.length > 0) {
      return products;
    } else {
      throw new NotFoundException('No product data found');
    }

    // you can change keys that comes from db for below we changes (_id field to id).
    /* return products.map(
      prod => (
        {
          id: prod.id,
          title: prod.title,
          description: prod.description,
          price: prod.price,
        }
      )
    ); */
  }


  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
    /* return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }; */
  }


  /**************************** update operation ****************************/
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    const updatedProdValue = updatedProduct.save();
    return updatedProdValue;
  }


  /**************************** delete operation ****************************/
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();

    if (result.n === 0) {
      throw new NotFoundException('Product Is Unavailable to delete.');
    } else {
      return { status: 'Product deleted successfully' };
    }
  }


  /**************************** helper function ****************************/
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }


}
