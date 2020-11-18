import {
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  // ParseBoolPipe,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  HttpException,
  UseFilters,
  UnauthorizedException,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { AppService } from './app.service';

/* 
  Description: handled a custom error through file.(Exception Filter Example)
*/
// import { HttpExceptionFilter } from './http-exception.filter';
import { HttpExceptionFilter } from './exceptionFilters/http-exception.filter';
import { OwnErrorFilter, OwnError } from './exceptionFilters/own-error.filter';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
// import { Roles } from './roles.decorator'; // no need to write on guards folder 
// import { RolesGuard } from './roles.guard'; // no need to write on guards folder

/* 
  Description: handled a custom error through class.(Exception Filter Example)
*/
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

/*
  @Controller()  method describes routing mechanism.
*/
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }
  /* 
    description: default route
    URL : http://localhost:3000/
  */
  // @Get()
  // greetingMsg(): string {
  //   return this.appService.greetingMsg();
  // }


  /* 
    description: default route
    URL : http://localhost:3000/
  */
  @Get()
  @Header('Content-Type', 'text/html')
  greetingMsg(): any {
    return this.appService.greetingMsg();
  }


  /* 
    description: validateQueryString is method that runs before actual method via Query string.
    to validate query parameter as a Numeric or not.
    if not then send "statusCode": 400.
    internally it uses pipe validation method of nest.
    URL : http://localhost:3000/query?id=numericValue
  */
  @Get("/query")
  validateQueryString(
    @Query('id', ParseIntPipe) idval: number
  ): any {
    return this.appService.validateQueryString(idval);
  }


  /* 
    description: uuidValidation is method that runs before actual method via params.
    to validate params as a Uuid number or not.
    if not then send "statusCode": 400.
    internally it uses pipe validation method of nest.
    URL : http://localhost:3000/string/1b671a64-40d5-491e-99b0-da01ff1f3341;
  */
  @Get('/string/:uuid')
  async uuidValidation(
    @Param('uuid', new ParseUUIDPipe()) uuid: string
  ) {
    return this.appService.validateUuidString(uuid);
  }

  /********************************** exceprion filters concept starts **********************************/
  /* 
    description: exception filters example
    URL : http://localhost:3000/string/1b671a64-40d5-491e-99b0-da01ff1f3341;
  */
  @Get('/exceptionFilter')
  async exceptionFilter() {
    // method:1
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // method:2
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: "This Is A Custom Message",
    // }, 403);

    // method:3
    throw new ForbiddenException();
  }

  @Get('/exceptionFilterFile')
  @UseFilters(new HttpExceptionFilter())
  async exceptionFilterFile() {
    throw new ForbiddenException();
  }

  @Get('/exceptionFilterOwnError')
  @UseFilters(new OwnErrorFilter())
  async exceptionFilterOwnError() {
    throw new OwnError();
  }
  /********************************** exceprion filters concept ends **********************************/

  // type command in terminal to create guards from cli :- nest g guard roles
  @Get('/guardsExample')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', 'admin')
  async guardsExample() {
    /* const user = {
      name: "Siddhesh",
      roles: ['standard-user'],
    }
    const requiredRoles = "admin";

    if (!user.roles.includes(requiredRoles)) {
      throw new UnauthorizedException("User Not Admin");
    } */
    return this.appService.guardsExample();
  }

  // type command in terminal to create guards from cli :- nest g decorator roles
  @Get('/guardsWithCustomDecoratorExample')
  @UseGuards(RolesGuard)
  @Roles('admin')   // custom decoratoe to send role admin to endpoints 
  async guardsWithCustomDecoratorExample() {
    return this.appService.guardsExample();
  }

}