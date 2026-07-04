import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PositiveTag, PositiveTagPayload } from '../models/positive-tag.model';

@Injectable({ providedIn: 'root' })
export class PositiveTagsApiService {
  private readonly apiUrl = `${environment.apiUrl}/positive-tags`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<PositiveTag[]> {
    return this.http.get<PositiveTag[]>(this.apiUrl);
  }

  create(payload: PositiveTagPayload): Observable<PositiveTag> {
    return this.http.post<PositiveTag>(this.apiUrl, payload);
  }

  update(
    id: string,
    payload: Partial<PositiveTagPayload>,
  ): Observable<PositiveTag> {
    return this.http.patch<PositiveTag>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
