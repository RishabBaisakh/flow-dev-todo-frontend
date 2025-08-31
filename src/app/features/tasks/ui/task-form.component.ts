import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AllTaskStatuses, TaskStatus } from '../../../shared/models/task-status';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" style="display:grid;gap:.5rem;margin:1rem 0;">
      <input formControlName="title" placeholder="Title" />
      <textarea formControlName="description" placeholder="Description"></textarea>
      <input formControlName="assignedUser" placeholder="Assigned user (optional)" />
      <select formControlName="status">
        <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
      </select>
      <button type="submit" [disabled]="form.invalid">Add Task</button>
    </form>
  `,
})
export class TaskFormComponent {
  @Output() create = new EventEmitter<{
    title: string;
    description: string;
    assignedUser: string;
    status: TaskStatus;
  }>();

  statuses = AllTaskStatuses;
  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignedUser: [''],
      status: ['ToDo' as TaskStatus, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) this.create.emit(this.form.value as any);
  }
}
