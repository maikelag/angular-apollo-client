import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';

import { Store, State, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as newsActions from '../state/news.actions';
import * as fromNews from '../state/news.reducers';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [NewsService]
})
export class NewsListComponent implements OnInit {
  newsArray: Array<News> = [];
  allNews$: Observable<Array<News>>;
  error$: Observable<String>;

  constructor(
    private newsServices: NewsService,
    private store: Store<fromNews.AppState>,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.newsServices.listAllNews().subscribe(news => {
      this.newsArray = news;
    });
    this.store.dispatch(new newsActions.LoadNews());
    this.allNews$ = this.store.pipe(select(fromNews.getNews));
    this.error$ = this.store.pipe(select(fromNews.getError));
  }

  deleteNews(id) {
    this.newsServices.deleteNews(id).subscribe(
      newsDeleted => {
        this.store.dispatch(new newsActions.LoadNews());
        this.allNews$ = this.store.pipe(select(fromNews.getNews));
        this.toastr.success(newsDeleted.title, 'Has eliminado correctamente la noticia: ');
      },
      error => {
        this.toastr.error('ERROR', 'Ha ocurrido un error al eliminar la noticia ');
      }
    )
  }
}
