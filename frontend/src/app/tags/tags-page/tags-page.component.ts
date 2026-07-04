import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PositiveTagsListComponent } from '../positive-tags-list/positive-tags-list.component';
import { NegativeTagsListComponent } from '../negative-tags-list/negative-tags-list.component';

@Component({
  selector: 'app-tags-page',
  imports: [MatTabsModule, PositiveTagsListComponent, NegativeTagsListComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPageComponent {}
