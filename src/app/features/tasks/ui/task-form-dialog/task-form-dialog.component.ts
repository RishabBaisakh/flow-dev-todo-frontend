import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AllTaskStatuses, TaskStatus } from '../../../../shared/models/task-status';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.css',
})
export class TaskFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  statuses: TaskStatus[] = AllTaskStatuses;
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignedUser: [''],
      status: ['ToDo' as TaskStatus, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    console.log('called!');
    console.log('Form Valid:', this.form.valid);
    console.log('Form Value:', this.form.value);

    if (this.form.valid) {
      console.log('About to emit...');
      this.dialogRef.close(this.form.value as any);
    } else {
      console.warn('Form is invalid:', this.form.errors, this.form.getRawValue());
    }
  }
}
