import { Injectable, signal } from '@angular/core';
import { TaskApi } from '../services/task.api';
import {
  Task,
  CreateTaskDto,
  UpdateTaskStatusDto,
  PaginatedResponse,
} from '../../shared/models/task';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksStore {
  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly totalTasks = signal(0);
  readonly currentPage = signal(1);

  constructor(private api: TaskApi) {}

  async load(pageNumber = 1, pageSize = 5) {
    this.loading.set(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const res: PaginatedResponse = await firstValueFrom(
        this.api.getAllPaginated(pageNumber, pageSize)
      )!; // assert non-null
      this.tasks.set(res.tasks);
      this.totalTasks.set(res.totalTasks);
      this.currentPage.set(res.pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading.set(false);
    }
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
