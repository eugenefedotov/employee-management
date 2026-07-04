import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PositiveTag } from '../../models/positive-tag.model';
import {NegativeTag} from '../../models/negative-tag.model';

@Component({
  selector: 'app-tag-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tag-form-dialog.component.html',
  styleUrl: './tag-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagFormDialogComponent {
  isEditMode: boolean;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TagFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PositiveTag | NegativeTag | null,
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
