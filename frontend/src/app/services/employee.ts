import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../models/employee.model';

interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

const API_URL = 'http://localhost:3000/api/v1/empleados';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public readonly employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  loadAll(): void {
    this.http.get<ApiSuccess<Employee[]>>(API_URL).subscribe({
      next: (res) => this.employeesSubject.next(res.data),
      error: (err) => console.error('Error al cargar empleados', err),
    });
  }

  create(dto: CreateEmployeeDto): Observable<ApiSuccess<Employee>> {
    return this.http.post<ApiSuccess<Employee>>(API_URL, dto).pipe(
      tap((res) => {
        const current = this.employeesSubject.getValue();
        this.employeesSubject.next([...current, res.data]);
      })
    );
  }

  update(id: string, dto: UpdateEmployeeDto): Observable<ApiSuccess<Employee>> {
    return this.http.put<ApiSuccess<Employee>>(`${API_URL}/${id}`, dto).pipe(
      tap((res) => {
        const current = this.employeesSubject.getValue();
        const updated = current.map((emp) => (emp.id === id ? res.data : emp));
        this.employeesSubject.next(updated);
      })
    );
  }

  delete(id: string): Observable<ApiSuccess<null>> {
    return this.http.delete<ApiSuccess<null>>(`${API_URL}/${id}`).pipe(
      tap(() => {
        const current = this.employeesSubject.getValue();
        const filtered = current.filter((emp) => emp.id !== id);
        this.employeesSubject.next(filtered);
      })
    );
  }
}