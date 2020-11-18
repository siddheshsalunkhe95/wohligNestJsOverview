import { HttpException } from '@nestjs/common';
import { AppService } from './app.service';
export declare class ForbiddenException extends HttpException {
    constructor();
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    greetingMsg(): any;
    validateQueryString(idval: number): any;
    uuidValidation(uuid: string): {};
    exceptionFilter(): any;
    exceptionFilterFile(): any;
    exceptionFilterOwnError(): any;
    guardsExample(): {};
    guardsWithCustomDecoratorExample(): {};
}
