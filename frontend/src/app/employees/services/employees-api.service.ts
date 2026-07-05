import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee, EmployeePayload} from '../models/employee';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {

  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  create(payload: EmployeePayload): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, payload);
  }

  update(id: string, payload: Partial<EmployeePayload>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
