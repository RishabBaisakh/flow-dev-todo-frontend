import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Task } from '../../../../shared/models/task';
import {
  AllTaskStatuses,
  TaskStatus,
  TaskStatusLabels,
} from '../../../../shared/models/task-status';
import { NgIf, NgClass } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, MatPaginatorModule, MatTableModule, MatChipsModule, NgClass, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements AfterViewInit {
  @Input() tasks: Task[] = [];
  @Output() changeStatus = new EventEmitter<{ id: string; status: TaskStatus }>();

  statuses = AllTaskStatuses;
  labels = TaskStatusLabels;
  tableDataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['-', 'title', 'assignee', 'status'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  statusStyleClass: Record<TaskStatus, string> = {
    ToDo: 'app-background-color-todo',
    InProgress: 'app-background-color-inprogress',
    Completed: 'app-background-color-completed',
  };

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  trackById = (_: number, t: Task) => t.id;
  onStatus(id: string, status: TaskStatus) {
    this.changeStatus.emit({ id, status });
  }

  getStatusLabel(status: TaskStatus): string {
    return this.labels[status];
  }

  getStatusStyleClass(status: TaskStatus): string {
    return this.statusStyleClass[status];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.tableDataSource.data = this.tasks;
    }
  }
}
