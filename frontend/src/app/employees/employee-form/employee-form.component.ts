import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {EmployeesApiService} from '../services/employees-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../models/employee';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {PositiveTag} from '../../tags/models/positive-tag.model';
import {NegativeTag} from '../../tags/models/negative-tag.model';
import {PositiveTagsApiService} from '../../tags/services/positive-tags-api.service';
import {NegativeTagsApiService} from '../../tags/services/negative-tags-api.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent {

  isEditMode = false;
  form: FormGroup;
  positiveTags = signal<PositiveTag[]>([]);
  negativeTags = signal<NegativeTag[]>([]);
  isSaving = signal<boolean>(false);
  employee?: Employee;

  constructor(
    private employeesApi: EmployeesApiService,
    private positiveTagsApi: PositiveTagsApiService,
    private negativeTagsApi: NegativeTagsApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.pattern(/^[a-zA-Z]+$/), Validators.required]],
      lastName: ['', [Validators.pattern(/^[a-zA-Z]+$/), Validators.required]],
      office: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern(/^\+\d+$/), Validators.required]],
      positiveTagIds: [[]],
      negativeTagIds: [[]],
    });
  }

  ngOnInit() {
    this.getAllTags();
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!employeeId;
    if (this.isEditMode && employeeId) {
      this.employeesApi.getById(employeeId).subscribe((employee: Employee) => {
        this.employee = employee;
        this.form.get('firstName')?.patchValue(employee.firstName);
        this.form.get('lastName')?.patchValue(employee.lastName);
        this.form.get('office')?.patchValue(employee.office);
        this.form.get('dateOfBirth')?.patchValue(employee.dateOfBirth);
        this.form.get('phoneNumber')?.patchValue(employee.phoneNumber);
        this.form.get('positiveTagIds')?.patchValue(employee.positiveTagIds);
        this.form.get('negativeTagIds')?.patchValue(employee.negativeTagIds);
      });
      this.form.markAsPristine();
    }
  }

  getAllTags(): void {
    this.positiveTagsApi.getAll().subscribe((positiveTags) => {
      this.positiveTags.set(positiveTags);
    });
    this.negativeTagsApi.getAll().subscribe((negativeTags) => {
      this.negativeTags.set(negativeTags);
    });
  }

  save() {
    if (this.form.invalid) { return }
    this.isSaving.set(true);
    const request$ = this.isEditMode && this.employee
      ? this.employeesApi.update(this.employee._id, this.form.getRawValue())
      : this.employeesApi.create(this.form.getRawValue())

    request$
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: (employee: Employee) => {
          this.snackBar.open(
            `Employee ${employee._id} is saved`,
            'Close',
            { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigateByUrl(`/employees`);
        },
        error: (error) => {
          this.snackBar.open(
            `Failed to save: ${error.message}`,
            'Close',
            { duration: 3000, panelClass: ['error-snackbar'] });
        },
      })
  }

  cancel() {
    return this.router.navigateByUrl('/employees');
  }
}
