import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { UserApi } from './app/core/services/user.api';
import { AdminStore } from './app/core/state/admin.store';
import { firstValueFrom } from 'rxjs';
import { environment } from './environments/environment';
import { TeamMembersStore } from './app/core/services/team-members';

export function loadAdminFactory(userApi: UserApi, adminStore: AdminStore) {
  return () => {
    return firstValueFrom(userApi.getById(environment.adminUserId))
      .then((user) => {
        adminStore.adminUser = user;
      })
      .catch((err) => {
        console.error('Failed to load admin user', err);
      });
  };
}

export function loadTeamMembersFactory(teamStore: TeamMembersStore) {
  return () => {
    teamStore.loadMembers(environment.adminUserId);
    return Promise.resolve();
  };
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    UserApi,
    AdminStore,
    TeamMembersStore,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAdminFactory,
      deps: [UserApi, AdminStore],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadTeamMembersFactory,
      deps: [TeamMembersStore],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
