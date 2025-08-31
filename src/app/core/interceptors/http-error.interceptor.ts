import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req)
    .pipe
    // Keep it simple: log; you can add a toast/snackbar later
    // catchError((err: HttpErrorResponse) => { console.error(err); return throwError(() => err); })
    ();
