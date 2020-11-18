import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class OwnError {
    constructor();
}
export declare class OwnErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
