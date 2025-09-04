import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe();
