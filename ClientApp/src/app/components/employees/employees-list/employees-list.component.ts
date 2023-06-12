import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.module';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'] 
})
export class EmployeesListComponent implements OnInit {
  /*  employees: Employee[] = [];*/
  employees: any;
  isedit: boolean = false;
  employeeform!: FormGroup|any;
  addEmployeeRequest: Employee = {
    id: '',
    firstName: '',
    secondName: '',
    surname: '',
    salary: 0,
    department: '',
    dateOfBirth: '',
    dateOfHire: ''
  };

  dateOfBirth: any;

  constructor(private EmployeesService: EmployeesService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employeeform = this.formbuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      surname: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfHire: ['', Validators.required],
    });
    this.GetData();
  }

  GetData() {
    this.EmployeesService.GetEmployeeList()
      .subscribe({
        next: (employees) => {
          this.employees = employees;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  AddEmployee() {
    console.log("works")
    this.isedit = false;
    console.log(this.addEmployeeRequest);
    this.EmployeesService.AddEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        console.log(employee);
        this.employeeform.reset();
        this.GetData();
      }
    })
  }

  SendData(employeeform: FormGroup) {
    this.employees.push(this.employeeform.value);
    this.EmployeesService.AddEmployee(this.employeeform.value).subscribe(res => {
      this.GetData();
    })
  }

  AddModel() {
    this.isedit = false;
    this.employeeform.reset();
  }

  DeleteEmployee(index: any, employee: any) {
    this.employeeform.id = employee.id;
    this.EmployeesService.DeleteEmployee(this.employeeform.id).subscribe(res => {
      this.employees.splice(index, 1);
      this.GetData();
    })
  }

  UpdateEmployee(employee: any) {
    console.log(this.employeeform.id);
    this.addEmployeeRequest.id = this.employeeform.id;
    this.EmployeesService.UpdateEmployee(this.employeeform.id, employee).subscribe({
      next: (employee) => {
        console.log(employee);
        this.GetData();
      }
    })
  }

  EditEmployee(index: any, employee: any) {
    this.isedit = true;
    this.employeeform.id = employee.id;
    this.employeeform.setValue({
      id: employee.id,
      firstName: employee.firstName,
      secondName: employee.secondName,
      surname: employee.surname,
      salary: employee.salary,
      department: employee.department,
      dateOfBirth: employee.dateOfBirth,
      dateOfHire: employee.dateOfHire
    })
  }

  key: string = "id";
  reverse: boolean = false;

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
