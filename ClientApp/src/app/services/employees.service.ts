import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.module';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  constructor(private http: HttpClient) { }

  AddEmployee(data: Employee): Observable<Employee> {
    data.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>('/api/employees', data);
  }

  GetEmployeeList(): Observable<any> {
    return this.http.get('/api/employees')
  }

  UpdateEmployee(id: any, data: any): Observable<any> {
    return this.http.put<any>("/api/employees/"+id, data);
  }

  DeleteEmployee(id: any): Observable<any> {
    return this.http.delete("/api/employees/"+id);
  }
}
