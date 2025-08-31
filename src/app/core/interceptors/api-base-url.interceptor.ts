import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url.startsWith('http') ? req.url : `${environment.apiBaseUrl}${req.url}`;
  return next(req.clone({ url, setHeaders: { 'Content-Type': 'application/json' } }));
};
