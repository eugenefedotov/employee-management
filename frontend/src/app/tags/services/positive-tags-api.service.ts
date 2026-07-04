import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PositiveTag } from '../models/positive-tag.model';
import {TagPayload} from '../models/tag-payload';

@Injectable({ providedIn: 'root' })
export class PositiveTagsApiService {
  private apiUrl = `${environment.apiUrl}/positive-tags`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PositiveTag[]> {
    return this.http.get<PositiveTag[]>(this.apiUrl);
  }

  create(payload: TagPayload): Observable<PositiveTag> {
    return this.http.post<PositiveTag>(this.apiUrl, payload);
  }

  update(id: string, payload: Partial<TagPayload>): Observable<PositiveTag> {
    return this.http.patch<PositiveTag>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
