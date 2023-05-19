import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAuthToken();
    console.log('token', token);

    if (token) {
      request = request.clone({
        setHeaders: { authorization: `${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect user to the logout page
          }
        }
        return throwError(err);
      })
    );

    // const jwt = localStorage.getItem("token");

    // if (jwt) {
    //   return next.handle(request.clone({
    //     setHeaders: { authorization: `${jwt}` }
    //   }));
    // } else {
    //   return next.handle(request);
    // }
  }

  // intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const jwt = localStorage.getItem("token");

  //   if (jwt) {
  //     return next.handle(httpRequest.clone({
  //       setHeaders: { authorization: `${jwt}` }
  //     }));
  //   } else {
  //     return next.handle(httpRequest);
  //   }
  // }
}
