import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

// Based on `timeout.interceptor.ts` from https://docs.nestjs.com/interceptors
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private timeoutMs: number) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest()
        console.log(`TimeoutInterceptor.intercept | req.url: ${req.url}`)
        return next.handle().pipe(
            timeout(this.timeoutMs),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    console.log(`TimeoutInterceptor.intercept caught error | req.url ${req.url}`)
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        );
    };
};