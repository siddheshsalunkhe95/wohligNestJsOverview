import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

export class OwnError {
    constructor() {
        Error.apply(this, arguments);
    }
}

@Catch(OwnError)
export class OwnErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response
            .status(500)
            .json({
                statusCode: 500,
                timestamp: new Date().toISOString(),
                path: request.url,
                text: "INTERNAL SERVER ERROR"
            })
    }
} 