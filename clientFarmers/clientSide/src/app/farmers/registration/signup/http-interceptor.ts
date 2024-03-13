import { AuthService } from './../../../auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class httpInterceptor implements HttpInterceptor {
  authToken;
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authService
      .getToken()

      .subscribe((token) => {
        this.authToken = token;
      });
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authToken}`),
    });
    return next.handle(authRequest);
  }
}
