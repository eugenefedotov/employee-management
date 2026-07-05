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
    MatSelectModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent {

  isEditMode = false;
  form: FormGroup;
  positiveTags: PositiveTag[] = [];
  negativeTags: NegativeTag[] = [];

  constructor(
    private api: EmployeesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      office: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      positiveTagIds: [[]],
      negativeTagIds: [[]],
    });
  }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!employeeId;
    if (this.isEditMode && employeeId) {
      this.api.getById(employeeId).subscribe((employee: Employee) => {
        this.form.get('firstName')?.patchValue(employee.firstName);
      });
    }
  }

  save() {
    console.log('Save tapped!')
    if (this.form.valid) {
      console.log('Form is valid')
    }
    console.log('Form is NOT valid. Get out bro!')
  }

  cancel() {
    return this.router.navigate(['employees/']);
  }

}
