import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees-list/employees-list.component').then(
        (m) => m.EmployeesListComponent,
      ),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./tags/tags-page/tags-page.component').then(
        (m) => m.TagsPageComponent,
      ),
  },
  {
    path: 'employee/:id/edit',
    loadComponent: () =>
      import('./employees/employee-form/employee-form.component').then(
        (m) => m.EmployeeFormComponent,
      ),
  },
  {
    path: 'employee/new',
    loadComponent: () =>
      import('./employees/employee-form/employee-form.component').then(
        (m) => m.EmployeeFormComponent,
      ),
  },
];
