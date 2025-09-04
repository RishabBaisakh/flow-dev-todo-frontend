import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserApi } from '../../../core/services/user.api';
import { CreateUserDto, UserDto } from '../../../shared/models/user';
import { AdminStore } from '../../../core/state/admin.store';
import { Subscription } from 'rxjs';
import { TeamMembersStore } from '../../../core/services/team-members';

@Component({
  selector: 'app-team-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.css'],
})
export class TeamDialogComponent implements OnInit {
  private userApi = inject(UserApi);
  private dialogRef = inject(MatDialogRef<TeamDialogComponent>);
  private adminStore = inject(AdminStore);
  private teamStore = inject(TeamMembersStore);

  adminUser: UserDto | null = null;
  teamMembers: UserDto[] = [];
  newMemberName = '';

  private subscription: Subscription = new Subscription();

  avatars = [
    'avatar1.svg',
    'avatar2.svg',
    'avatar3.svg',
    'avatar4.svg',
    'avatar5.svg',
    'avatar6.svg',
    'avatar7.svg',
    'avatar8.svg',
  ];

  ngOnInit() {
    this.adminUser = this.adminStore.adminUser || null;

    this.subscription.add(
      this.teamStore.members.subscribe((members) => {
        this.teamMembers = members;
      })
    );
  }

  getRandomAvatar(): string {
    const index = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[index];
  }

  addMember() {
    const name = this.newMemberName.trim();
    if (!name) return;

    const dto: CreateUserDto = {
      name,
      avatar: this.getRandomAvatar(),
    };

    this.userApi.create(dto).subscribe((member) => {
      this.teamStore.addMember(member);
      this.newMemberName = '';
    });
  }

  deleteMember(id: string) {
    this.userApi.delete(id).subscribe(() => {
      this.teamStore.removeMember(id);
    });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
