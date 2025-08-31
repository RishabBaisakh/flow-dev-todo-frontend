import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTaskDto, Task, UpdateTaskStatusDto } from '../../shared/models/task';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private http = inject(HttpClient);
  private base = '/tasks';

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.base, dto);
  }

  updateStatus(id: string, dto: UpdateTaskStatusDto): Observable<Task> {
    return this.http.patch<Task>(`${this.base}/${id}`, dto);
  }
}
