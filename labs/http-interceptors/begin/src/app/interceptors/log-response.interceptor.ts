import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LogResponseTimeInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap(
        (event) => { ok = event instanceof HttpResponse ? 'succeeded' : ''; },
        () => { ok = 'failed'; }
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        console.log(`${req.method} '${req.urlWithParams}' \n\t ${ok} in ${elapsed} ms.`);
      })
    );
  }
}
