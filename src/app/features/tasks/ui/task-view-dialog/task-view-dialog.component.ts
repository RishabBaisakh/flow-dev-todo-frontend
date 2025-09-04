// task-view-dialog.component.ts
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskStatus, AllTaskStatuses } from '../../../../shared/models/task-status';
import { UserDto } from '../../../../shared/models/user';

export interface TaskViewDialogData {
  task: any;
  users: UserDto[];
}

@Component({
  selector: 'app-task-view-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './task-view-dialog.component.html',
  styleUrl: './task-view-dialog.component.css',
})
export class TaskViewDialogComponent {
  task;
  users;
  statuses = AllTaskStatuses;

  constructor(
    public dialogRef: MatDialogRef<TaskViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskViewDialogData
  ) {
    this.task = this.data.task;
    this.users = this.data.users;
  }

  close() {
    this.dialogRef.close();
  }

  updateStatus() {
    this.dialogRef.close({ status: this.task.status });
  }
}
