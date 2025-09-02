import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../shared/models/task';
import {
  AllTaskStatuses,
  TaskStatus,
  TaskStatusLabels,
} from '../../../../shared/models/task-status';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, MatIconModule, MatTableModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() totalTasks = 0;
  @Input() pageSize = 5;
  @Input() pageIndex = 0;

  @Output() pageChange = new EventEmitter<{ page: number; size: number }>();
  @Output() changeStatus = new EventEmitter<{ id: string; status: TaskStatus }>();

  statuses = AllTaskStatuses;
  labels = TaskStatusLabels;
  displayedColumns: string[] = ['-', 'title', 'assignee', 'status'];

  get totalPages(): number {
    return Math.ceil(this.totalTasks / this.pageSize);
  }

  get pages(): number[] {
    const visible = 5;
    const start = Math.max(0, this.pageIndex - Math.floor(visible / 2));
    const end = Math.min(this.totalPages, start + visible);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  prevPage() {
    if (this.pageIndex > 0) this.goToPage(this.pageIndex - 1);
  }

  nextPage() {
    if (this.pageIndex < this.totalPages - 1) this.goToPage(this.pageIndex + 1);
  }

  goToPage(index: number) {
    this.pageChange.emit({ page: index + 1, size: this.pageSize });
  }

  getStatusLabel(status: TaskStatus): string {
    return this.labels[status];
  }

  getStatusStyleClass(status: TaskStatus): string {
    return {
      ToDo: 'app-background-color-todo',
      InProgress: 'app-background-color-inprogress',
      Completed: 'app-background-color-completed',
    }[status];
  }
}
