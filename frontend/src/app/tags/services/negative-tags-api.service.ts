import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NegativeTag} from '../models/negative-tag.model';
import {TagPayloadType} from '../models/tag-payload.type';

@Injectable({providedIn: 'root'})
export class NegativeTagsApiService {
  private apiUrl = `${environment.apiUrl}/negative-tags`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<NegativeTag[]> {
    return this.http.get<NegativeTag[]>(this.apiUrl);
  }

  create(payload: TagPayloadType): Observable<NegativeTag> {
    return this.http.post<NegativeTag>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<TagPayloadType>): Observable<NegativeTag> {
    return this.http.patch<NegativeTag>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
