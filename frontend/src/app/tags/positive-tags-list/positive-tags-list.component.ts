import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PositiveTagsApiService } from '../services/positive-tags-api.service';
import { PositiveTag, PositiveTagPayload } from '../models/positive-tag.model';
import { PositiveTagFormDialogComponent } from '../positive-tag-form-dialog/positive-tag-form-dialog.component';

@Component({
  selector: 'app-positive-tags-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './positive-tags-list.component.html',
  styleUrl: './positive-tags-list.component.scss',
})
export class PositiveTagsListComponent implements OnInit {
  protected tags = signal<PositiveTag[]>([]);
  protected displayedColumns = ['color', 'name', 'actions'];

  constructor(
    private api: PositiveTagsApiService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.api.getAll().subscribe((tags) => this.tags.set(tags));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PositiveTagFormDialogComponent);

    dialogRef.afterClosed().subscribe((result?: PositiveTagPayload) => {
      if (!result) {
        return;
      }
      this.api.create(result).subscribe(() => this.loadTags());
    });
  }

  openEditDialog(tag: PositiveTag): void {
    const dialogRef = this.dialog.open(PositiveTagFormDialogComponent, {
      data: tag,
    });

    dialogRef.afterClosed().subscribe((result?: PositiveTagPayload) => {
      if (!result) {
        return;
      }
      this.api.update(tag._id, result).subscribe(() => this.loadTags());
    });
  }

  deleteTag(tag: PositiveTag): void {
    if (!confirm(`Delete tag "${tag.name}"?`)) {
      return;
    }
    this.api.delete(tag._id).subscribe(() => this.loadTags());
  }
}
