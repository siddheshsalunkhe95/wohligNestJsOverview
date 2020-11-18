import { Module } from '@nestjs/common';

// import mongoose module
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';
import { ProductSchema } from '../products/product.model';

// import product controller and service file
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    // import schema
    imports: [
        MongooseModule.forFeature(
            [
                { name: 'Category', schema: CategorySchema },
                { name: 'Product', schema: ProductSchema }
            ]
        ),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})

export class CategoryModule { }

