import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { Response } from "express";
import { _ } from "lodash";

import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async addProduct(
        @Body() requestBody: Category,
        @Res() res: Response
    ) {
        const resultVal = await this.categoryService.addCategory(requestBody);
        if (!_.isEmpty(resultVal)) {
            res.status(HttpStatus.OK).send(resultVal);
        } else {
            res.status(HttpStatus.NO_CONTENT).json([]);
        }
    }


}
