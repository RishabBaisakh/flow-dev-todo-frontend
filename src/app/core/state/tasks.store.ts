import { Injectable, signal } from '@angular/core';
import { TaskApi } from '../services/task.api';
import { Task, CreateTaskDto, UpdateTaskStatusDto } from '../../shared/models/task';

@Injectable({ providedIn: 'root' })
export class TasksStore {
  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);

  constructor(private api: TaskApi) {}

  load(): void {
    this.loading.set(true);
    this.api.getAll().subscribe({
      next: (items) => this.tasks.set(items),
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
