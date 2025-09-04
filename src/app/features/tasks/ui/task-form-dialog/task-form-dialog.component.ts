import { Component, inject, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AllTaskStatuses, TaskStatus } from '../../../../shared/models/task-status';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserDto } from '../../../../shared/models/user';
import { combineLatest, of } from 'rxjs';
import { AdminStore } from '../../../../core/state/admin.store';
import { TeamMembersStore } from '../../../../core/services/team-members';

export interface TaskFormDialogData {
  task?: any; // can replace with Task type
  users?: UserDto[];
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.css',
})
export class TaskFormDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  private fb = inject(FormBuilder);
  private adminStore = inject(AdminStore);
  private teamMembersStore = inject(TeamMembersStore);

  statuses: TaskStatus[] = AllTaskStatuses;
  users: UserDto[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data?: TaskFormDialogData) {}

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    assignedUserId: [''],
    status: ['ToDo' as TaskStatus, Validators.required],
  });

  ngOnInit() {
    if (this.data?.users?.length) {
      this.users = this.data.users;
    } else {
      combineLatest([of(this.adminStore.adminUser), this.teamMembersStore.members]).subscribe(
        ([admin, members]) => {
          if (admin) this.users = [admin, ...members];
          else this.users = members;

          if (!this.form.get('assignedUserId')?.value && admin) {
            this.form.patchValue({ assignedUserId: admin.id });
          }
        }
      );
    }

    if (this.data?.task) {
      this.form.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        assignedUserId: this.data.task.assignedUser?.id,
        status: this.data.task.status,
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.data?.task;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
