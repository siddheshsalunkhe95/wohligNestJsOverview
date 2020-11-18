// import Nest JS Core
import { Module } from '@nestjs/common';

// import controller and service file
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import mongoose module
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

// cron scheduler
import { ScheduleModule } from '@nestjs/schedule';

// db conncetion
@Module({
  imports: [
    ProductsModule, // import another module.
    CategoryModule, // import another module.
    MongooseModule.forRoot(
      "mongodb://localhost:27017/testing-portal",

      // 'mongodb+srv://siddhesh_95:siddhesh_95@cluster0.sywm5.mongodb.net/nestJsDb?retryWrites=true&w=majority',
    ),
    ScheduleModule.forRoot() // cron example
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
