import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  UseInterceptors
} from '@nestjs/common';
import { Response } from "express";
import { _ } from "lodash";
import { BenchmarkInterceptor } from '../interceptors/benchmark.Interceptor';

// cron route. 
import { Cron, Interval, Timeout } from '@nestjs/schedule';

import { ProductsService } from './products.service';
import { Product } from './product.model'; // used in addProduct() 

import { createProductDecorator } from '../decorators/addProduct.decorator';

// defines incoming http request route (localhost:3000/products)
@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  /* 
    author: Siddhesh Salunkhe
    description: scheduler to run at specific time once a day(Runs at every night at 23:59).
    @Cron('seconds minutes hours dayOfMonth month dayOfWeek')
    paramter 1: seconds - 0
    paramter 2: minutes - 59
    paramter 3: hours - 23 
    paramter 4: dayOfMonth - *
    paramter 5: month - *
    paramter 6: dayOfWeek - 0-7 
    // @Cron('0 59 23 * * 0-7')
  */
  /* @Cron('0 16 31 * * 0-7')
  async testCron() {
    const resultData = await this.productsService.getAllProducts();

    if (resultData && resultData.length > 0) {
      console.log("resultData----------------->", resultData);
      return resultData;
    } else {
      throw new NotFoundException('No data found');
      // return "No data found";
    }
  } */

  /**************************** post method ****************************/
  /* 
    description: 
  */
  /* @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Res() res: Response
  ) {
    const generatedId = await this.productsService.addProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  } */

  @Post()
  async addProduct(
    @Body() requestBody: Product, // it gives all data from product model (no need to write specific keys like: @Body('title') prodTitle: string,)
    @Res() res: Response // for sending your custom response msg.
  ) {
    const resultVal = await this.productsService.addProduct(requestBody);
    if (!_.isEmpty(resultVal)) {
      res.status(HttpStatus.OK).send(resultVal);
    } else {
      res.status(HttpStatus.NO_CONTENT).json([]);
    }
    // ---------:response msg:---------
    /* if (resultVal && resultVal._id) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Success",
        data: resultVal
      });
    } else {
      return res.status(HttpStatus.NO_CONTENT).json({
        success: false,
        message: "Error",
        data: []
      });
    } */
    // ---------:response msg ends:---------
  }


  @Post('/createProduct')
  async customDecoratorMethod(
    @createProductDecorator() requestBody: Product, // it gives all data from product model (no need to write specific keys like: @Body('title') prodTitle: string,)
    @Res() res: Response // for sending your custom response msg.
  ) {
    const resultVal = await this.productsService.addProduct(requestBody);
    if (!_.isEmpty(resultVal)) {
      res.status(HttpStatus.OK).send(resultVal);
    } else {
      res.status(HttpStatus.NO_CONTENT).json([]);
    }
  }

  /**************************** get method ****************************/
  @Get()
  @UseInterceptors(BenchmarkInterceptor)
  async getAllProducts(
    @Res() res: Response
  ) {
    const products = await this.productsService.getAllProducts();
    if (products && products.length > 0) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Success",
        data: products
      });
    } else {
      return res.status(HttpStatus.NO_CONTENT).json({
        success: false,
        message: "Error",
        data: []
      });
    }
  }


  @Get(':id')
  getSingleProduct(
    @Param('id') prodId: string
  ) {
    return this.productsService.getSingleProduct(prodId);
  }


  /**************************** update method ****************************/
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updatedProd = await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return updatedProd;
  }


  /**************************** delete method ****************************/
  @Delete(':id')
  async deleteProduct(
    @Param('id') prodId: string
  ) {
    const result = await this.productsService.deleteProduct(prodId);
    return result;
  }

}
