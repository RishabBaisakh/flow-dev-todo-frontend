import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, UserDto } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/users';

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.base);
  }

  getById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.base}/${id}`);
  }

  create(dto: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.base, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
