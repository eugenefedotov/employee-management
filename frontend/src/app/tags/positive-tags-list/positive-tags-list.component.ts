import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PositiveTagsApiService } from '../services/positive-tags-api.service';
import { PositiveTag } from '../models/positive-tag.model';
import { TagFormDialogComponent } from '../dialogs/tag-form-dialog/tag-form-dialog.component';
import {TagPayloadType} from '../models/tag-payload.type';

@Component({
  selector: 'app-positive-tags-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './positive-tags-list.component.html',
  styleUrl: './positive-tags-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositiveTagsListComponent implements OnInit {
  tags = signal<PositiveTag[]>([]);
  displayedColumns = ['color', 'name', 'actions'];

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
    const dialogRef = this.dialog.open(TagFormDialogComponent);

    dialogRef.afterClosed().subscribe((result?: TagPayloadType) => {
      if (!result) {
        return;
      }
      this.api.create(result).subscribe(() => this.loadTags());
    });
  }

  openEditDialog(tag: PositiveTag): void {
    const dialogRef = this.dialog.open(TagFormDialogComponent, {
      data: tag,
    });

    dialogRef.afterClosed().subscribe((result?: TagPayloadType) => {
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
