import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from} from 'rxjs';
import { map, delay, filter} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { TvShow } from '../models/tv-show';

const API_BASE = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) { }

  listAllTvShows(): Observable<any> {
    return this.http.get(`${API_BASE}/tvshows`);
  }

  createTvShow(newTvShow: TvShow): Observable<any> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${API_BASE}/tvshows`, newTvShow, {headers: headers});
  }

  deleteTvShow(id: string): Observable<any> {
    return this.http.delete(`${API_BASE}/tvshows/${id}`);
  }

  updateTvShow(id: string, newTvShow: TvShow) {
    return this.http.put(`${API_BASE}/tvshows/${id}`, newTvShow);
  }

  findOneTvShow(id: string): Observable<any> {
    return this.http.get(`${API_BASE}/tvshows/${id}`);
  }
}
