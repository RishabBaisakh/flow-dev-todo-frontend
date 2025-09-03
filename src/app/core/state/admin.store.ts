import { Injectable } from '@angular/core';
import { UserDto } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AdminStore {
  private _adminUser: UserDto | null = null;

  set adminUser(user: UserDto | null) {
    this._adminUser = user;
  }

  get adminUser(): UserDto | null {
    return this._adminUser;
  }
}
