import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AllTaskStatuses, TaskStatus } from '../../../../shared/models/task-status';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './task-form.component.html',
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
