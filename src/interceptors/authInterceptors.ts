import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem("JWT");
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigateByUrl("/auth/login");
        }
        return throwError(error);
      })
    );
  }
}
