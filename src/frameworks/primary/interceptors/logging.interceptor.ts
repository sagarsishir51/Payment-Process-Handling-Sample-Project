import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const args = context.getArgs()[0];

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `====> [ ${args.method} ${args.url} - ${Date.now() - now}ms ]`,
          ),
        ),
      );
  }
}
