import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './services/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private employeeService = inject(EmployeeService);
  employees$ = this.employeeService.employees$;

  ngOnInit(): void {
    this.employeeService.loadAll();
  }
}