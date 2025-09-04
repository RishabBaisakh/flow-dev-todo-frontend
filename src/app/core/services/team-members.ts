import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../../shared/models/user';
import { UserApi } from '../services/user.api';

@Injectable({ providedIn: 'root' })
export class TeamMembersStore {
  private userApi = inject(UserApi);

  private _members = new BehaviorSubject<UserDto[]>([]);
  members: Observable<UserDto[]> = this._members.asObservable();

  constructor() {
    this.loadMembers();
  }

  loadMembers(adminId?: string) {
    this.userApi.getAll().subscribe((users) => {
      const members = adminId ? users.filter((u) => u.id !== adminId) : users;
      this._members.next(members);
    });
  }

  setMembers(members: UserDto[]) {
    this._members.next(members);
  }

  addMember(member: UserDto) {
    this._members.next([...this._members.getValue(), member]);
  }

  removeMember(id: string) {
    this._members.next(this._members.getValue().filter((m) => m.id !== id));
  }

  getValue(): UserDto[] {
    return this._members.getValue();
  }
}
