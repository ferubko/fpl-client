///<reference path="../../../node_modules/@angular/common/http/http.d.ts"/>
import {Injectable} from "@angular/core";
import {HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";


@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const username = JSON.parse(sessionStorage.getItem('username'));
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (username && token) {
      request = this.addToken(request, token);

    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('401 error');
        return throwError(error);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
