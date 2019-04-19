import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RawNewsService {
  constructor(private http: HttpClient) {}

  allRawNews() {
    return this.http.get('http://127.0.0.1:3000/raw-news');
  }

  rawNewsBySource(source: String) {
    return this.http.get(`http://127.0.0.1:3000/raw-news?url=${source}`);
  }

  createRawNewsManual(rawNews: any) {
    const data = new FormData();
    data.append('title', rawNews.title);
    data.append('description', rawNews.description);
    data.append('author', rawNews.author);
    data.append('image', rawNews.image);

    return this.http.post('http://127.0.0.1:3000/raw-news', data);
  }

}
