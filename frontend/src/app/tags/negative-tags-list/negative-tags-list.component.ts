import {Component, signal} from '@angular/core';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {NegativeTagsApiService} from '../services/negative-tags-api.service';
import {NegativeTag} from '../models/negative-tag.model';
import {TagFormDialogComponent} from '../dialogs/tag-form-dialog/tag-form-dialog.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from '@angular/material/table';

@Component({
  selector: 'app-negative-tags-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './negative-tags-list.component.html',
  styleUrl: './negative-tags-list.component.scss'
})
export class NegativeTagsListComponent {

  tags = signal<NegativeTag[]>([])
  displayedColumns = ['color', 'name', 'actions'];

  constructor(private api: NegativeTagsApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.api.getAll().subscribe((tags) => this.tags.set(tags));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TagFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.api.create(result).subscribe(() => { this.loadTags() })
    });
  }

  openEditDialog(tag: NegativeTag): void {
    const dialogRef = this.dialog.open(TagFormDialogComponent, {
      data: tag
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.api.update(tag._id, result).subscribe(() => { this.loadTags() })
    });
  }

  deleteTag(tag: NegativeTag): void {
    confirm('Are you sure?');
  }
}
