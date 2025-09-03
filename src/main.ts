import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { UserApi } from './app/core/services/user.api';
import { AdminStore } from './app/core/state/admin.store';
import { firstValueFrom } from 'rxjs';
import { environment } from './environments/environment';

export function loadAdminFactory(userApi: UserApi, adminStore: AdminStore) {
  return () => {
    return firstValueFrom(userApi.getById(environment.adminUserId))
      .then((user) => {
        adminStore.adminUser = user;
        console.log('Admin loaded at startup:', user);
      })
      .catch((err) => {
        console.error('Failed to load admin user', err);
      });
  };
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    UserApi,
    AdminStore,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAdminFactory,
      deps: [UserApi, AdminStore],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
