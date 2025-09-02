import { Injectable, signal } from '@angular/core';
import { TaskApi } from '../services/task.api';
import {
  Task,
  CreateTaskDto,
  UpdateTaskStatusDto,
  PaginatedResponse,
} from '../../shared/models/task';

@Injectable({ providedIn: 'root' })
export class TasksStore {
  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly totalTasks = signal(0);
  readonly currentPage = signal(1);

  constructor(private api: TaskApi) {}

  load(pageNumber = 1, pageSize = 5): void {
    this.loading.set(true);
    this.api.getAllPaginated(pageNumber, pageSize).subscribe({
      next: (res: PaginatedResponse) => {
        this.tasks.set(res.tasks);
        this.totalTasks.set(res.totalTasks);
        this.currentPage.set(res.pageNumber);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }

  add(dto: CreateTaskDto): void {
    this.api.create(dto).subscribe((task) => this.tasks.update((list) => [task, ...list]));
  }

  setStatus(id: string, dto: UpdateTaskStatusDto): void {
    this.api
      .updateStatus(id, dto)
      .subscribe((updated) =>
        this.tasks.update((list) => list.map((t) => (t.id === updated.id ? updated : t)))
      );
  }
}
