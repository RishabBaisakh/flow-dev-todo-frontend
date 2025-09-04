import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../../../shared/models/task';
import {
  AllTaskStatuses,
  TaskStatus,
  TaskStatusLabels,
} from '../../../../shared/models/task-status';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskFormDialogComponent,
  TaskFormDialogData,
} from '../task-form-dialog/task-form-dialog.component';
import { TeamMembersStore } from '../../../../core/services/team-members';
import { TaskViewDialogComponent } from '../task-view-dialog/task-view-dialog.component';
import { TasksStore } from '../../../../core/state/tasks.store';

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
  @Input() loading: boolean | null = false;

  @Output() pageChange = new EventEmitter<{ page: number; size: number }>();
  @Output() changeStatus = new EventEmitter<{ id: string; status: TaskStatus }>();

  statuses = AllTaskStatuses;
  labels = TaskStatusLabels;
  displayedColumns: string[] = ['-', 'title', 'assignee', 'status', 'actions'];

  private dialog = inject(MatDialog);
  private memberStore = inject(TeamMembersStore);
  private tasksStore = inject(TasksStore);

  get totalPages(): number {
    return Math.ceil(this.totalTasks / this.pageSize);
  }

  get isLoading(): boolean {
    return this.loading ?? false;
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

  openViewDialog(task: Task) {
    // Resolve assigned user object
    const assignedUser = this.memberStore.getValue().find((u) => u.id === task.assignedUserId);

    const dialogRef = this.dialog.open(TaskViewDialogComponent, {
      width: '500px',
      data: {
        task: { ...task, assignedUser }, // attach assignedUser
        users: this.memberStore.getValue(),
      } as TaskFormDialogData,
    });

    dialogRef.afterClosed().subscribe((updatedTask) => {
      if (updatedTask) {
        this.tasksStore.setStatus(task.id, { status: updatedTask.status });
        this.tasksStore.load(this.pageIndex, this.pageSize);
      }
    });
  }
}
