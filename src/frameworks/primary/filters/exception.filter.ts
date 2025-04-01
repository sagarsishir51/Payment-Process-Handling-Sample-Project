import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {ZodError} from 'zod';
import {generateErrorMessage} from 'zod-error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let stack = (exception as any)?.stack;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let httpMessage = 'Something went wrong';

    if (exception instanceof Error) httpMessage = exception.message;

    if (exception instanceof ZodError)
      httpMessage = generateErrorMessage(exception.issues);

    if (exception instanceof HttpException) httpMessage = exception.message;

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as { message: Array<string> };
      httpMessage = response?.message?.toString();
    }
    Logger.error(httpMessage, stack, `${request.method} ${request.url}`);

    const responseBody = {
      statusCode: httpStatus,
      message: httpMessage,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
