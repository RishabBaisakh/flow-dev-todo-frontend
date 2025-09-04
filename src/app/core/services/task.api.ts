import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateTaskDto,
  PaginatedResponse,
  Task,
  UpdateTaskStatusDto,
} from '../../shared/models/task';
import { delay, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/tasks';

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  getAllPaginated(pageNumber = 1, pageSize = 5): Observable<PaginatedResponse> {
    return this.http
      .get<PaginatedResponse>(`${this.base}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(delay(1000));
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.base, dto);
  }

  updateStatus(id: string, dto: UpdateTaskStatusDto): Observable<Task> {
    return this.http.patch<Task>(`${this.base}/${id}/status`, dto);
  }
}
