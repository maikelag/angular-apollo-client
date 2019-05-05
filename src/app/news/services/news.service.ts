import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, delay, filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { environment } from '@env/environment';
import { News } from '../models/news.model';

const API_BASE = environment.api_server;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  listAllNews(): Observable<any> {
    return this.http.get(`${API_BASE}/news`);
  }

  findOneNews(id: any): Observable<any> {
    return this.http.get(`${API_BASE}/news/${id}`);
  }

  createNews(news: News): Observable<any> {
    return this.http.post(`${API_BASE}/news`, news);
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${API_BASE}/news/${id}`);
  }

  voteNews(vote: string, idNews: number): Observable<any> {
    return this.http.post(`${API_BASE}/news/${idNews}`, { vote: vote });
  }

  commentOfNews(idNews: number): Observable<any> {
    return this.http.get(`${API_BASE}/comments/news/${idNews}`);
  }

  voteComment(vote: string, idComment: number): Observable<any> {
    return this.http.post(`${API_BASE}/comments/${idComment}`, { vote: vote });
  }

  commentNews(comment, newsId) {
    return this.http.post(`${API_BASE}/comments/news/${newsId}`, comment);
  }
}
