import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { UpdateUserRequest } from '../models/update-user-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Users`, model);
  }

  getAllUsers(
    query?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number, pageSize?: number
  ): Observable<User> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<User>(`${environment.apiBaseUrl}/api/Users`, {
      params: params
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/api/Users/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiBaseUrl}/api/Users/${id}`);
  }

  updateUser(
    id: string,
    updateUserRequest: UpdateUserRequest
  ): Observable<User> {
    return this.http.put<User>(
      `${environment.apiBaseUrl}/api/Users/${id}`,
      updateUserRequest
    );
  }

  getPermission(): Observable<PermissionName> {
    return this.http.get<PermissionName>(
      `${environment.apiBaseUrl}/api/Permissions`
    );
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/api/Users/count`);
  }
}
