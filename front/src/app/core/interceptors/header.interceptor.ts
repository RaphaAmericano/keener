import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestModificada = request.clone({
      setHeaders:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':  'application/json',
        'Access-Control-Allow-Methods':'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS'
      }
    });
    console.log(requestModificada);
    return next.handle(requestModificada);
  }
}
