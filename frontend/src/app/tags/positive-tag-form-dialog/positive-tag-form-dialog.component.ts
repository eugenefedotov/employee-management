import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PositiveTag } from '../models/positive-tag.model';

@Component({
  selector: 'app-positive-tag-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './positive-tag-form-dialog.component.html',
  styleUrl: './positive-tag-form-dialog.component.scss',
})
export class PositiveTagFormDialogComponent {
  protected isEditMode: boolean;
  protected form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PositiveTagFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PositiveTag | null,
    private fb: FormBuilder,
  ) {
    this.isEditMode = !!this.data;
    this.form = this.fb.group({
      name: [this.data?.name ?? '', [Validators.required]],
      color: [this.data?.color ?? '#FFF', [Validators.required]],
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
