import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private _httpClient: HttpClient) { }

  allTvShows(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/tvshows`);
  }
}
