import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { EmployeeTableComponent } from '../employee-table/employee-table';
import { EmployeeFormComponent } from '../employee-form/employee-form';
import { Employee, CreateEmployeeDto } from '../../models/employee.model';

@Component({
  selector: 'app-employee-manager',
  standalone: true,
  imports: [CommonModule, EmployeeTableComponent, EmployeeFormComponent],
  templateUrl: './employee-manager.html',
  styleUrl: './employee-manager.css',
})
export class EmployeeManagerComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  employees$ = this.employeeService.employees$;
  employeeToEdit: Employee | null = null;

  ngOnInit(): void {
    this.employeeService.loadAll();
  }

  handleSave(dto: CreateEmployeeDto): void {
    if (this.employeeToEdit) {
      this.employeeService.update(this.employeeToEdit.id, dto).subscribe({
        next: () => (this.employeeToEdit = null),
        error: (err) => console.error('Error al actualizar', err),
      });
    } else {
      this.employeeService.create(dto).subscribe({
        error: (err) => console.error('Error al crear', err),
      });
    }
  }

  handleEditRequested(emp: Employee): void {
    this.employeeToEdit = emp;
  }

  handleCancelEdit(): void {
    this.employeeToEdit = null;
  }

  handleDeleteRequested(id: string): void {
    this.employeeService.delete(id).subscribe({
      error: (err) => console.error('Error al eliminar', err),
    });
  }
}