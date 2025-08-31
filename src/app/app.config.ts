import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { apiBaseUrlInterceptor } from './core/interceptors/api-base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([apiBaseUrlInterceptor, httpErrorInterceptor]))],
};
