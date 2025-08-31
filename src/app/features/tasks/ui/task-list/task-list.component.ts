import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../shared/models/task';
import {
  AllTaskStatuses,
  TaskStatus,
  TaskStatusLabels,
} from '../../../../shared/models/task-status';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() changeStatus = new EventEmitter<{ id: string; status: TaskStatus }>();

  statuses = AllTaskStatuses;
  labels = TaskStatusLabels;

  trackById = (_: number, t: Task) => t.id;
  onStatus(id: string, status: TaskStatus) {
    this.changeStatus.emit({ id, status });
  }

  getStatusLabel(status: TaskStatus): string {
    return this.labels[status];
  }
}
