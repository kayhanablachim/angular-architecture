import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CSRFInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const setHeaders = { 'x-csrf-token': 'my-awesome-csrf-token' };
    const clonedReq = req.clone({ setHeaders });

    return next.handle(clonedReq);
  }
}
