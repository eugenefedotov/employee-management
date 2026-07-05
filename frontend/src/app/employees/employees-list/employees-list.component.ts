import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {EmployeesApiService} from '../services/employees-api.service';
import {Employee} from '../models/employee';
import {Router} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {NegativeTagsApiService} from '../../tags/services/negative-tags-api.service';
import {PositiveTagsApiService} from '../../tags/services/positive-tags-api.service';
import {NegativeTag} from '../../tags/models/negative-tag.model';
import {PositiveTag} from '../../tags/models/positive-tag.model';
import {DatePipe} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-employees-list',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatTableModule,
    DatePipe,
    MatChipsModule
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {

  employees = signal<Employee[]>([]);
  displayedColumns = ['firstName', 'lastName', 'office', 'birthday', 'phone', 'tags', 'actions'];
  positiveTagsMap = signal(new Map<string, PositiveTag>());
  negativeTagsMap = signal(new Map<number, NegativeTag>());

  constructor(
    private employeeApi: EmployeesApiService,
    private positiveTagApi: PositiveTagsApiService,
    private negativeTagApi: NegativeTagsApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAll();
    this.positiveTagApi.getAll().subscribe((tags: PositiveTag[]) => {
      this.positiveTagsMap.set(new Map(tags.map((tag) => [tag._id, tag])));
    });
    this.negativeTagApi.getAll().subscribe((tags) => {
      this.negativeTagsMap.set(new Map(tags.map((tag) => [tag._id, tag])));
    });
  }

  getAll(): void {
    this.employeeApi.getAll().subscribe((employees: Employee[]) => { this.employees.set(employees) })
  }

  openForm(id?: string) {
    if (!id) {
      return this.router.navigate(['employee/new']);
    }
    return this.router.navigate([`employee/${id}/edit`]);
  }

  deleteEmployee(id: string): void {
    this.employeeApi.delete(id).subscribe((employee) => { this.getAll() });
  }
}
