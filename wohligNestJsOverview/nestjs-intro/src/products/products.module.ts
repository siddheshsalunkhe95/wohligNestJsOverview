import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

// import mongoose module
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
// import { CategorySchema } from "../category/category.model";

// import product controller and service file
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

//import MIDDLEWARE file
import { ProductMiddleware } from '../middlewares/product.middleware';


@Module({
  // import schema
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Product', schema: ProductSchema },
        // { name: "Category", schema: CategorySchema },
      ]
    ),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})

// export class ProductsModule { }
/* export MIDDLEWARE function to UserModule */
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes({ path: 'products', method: RequestMethod.ALL });
  }
}
