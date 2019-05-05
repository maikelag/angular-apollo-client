import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';

import { Store, State, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as newsActions from '../state/news.actions';
import * as fromNews from '../state/news.reducers';
import { Router } from '@angular/router';

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
    private router: Router
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
        alert(newsDeleted);
        this.store.dispatch(new newsActions.LoadNews());
        this.allNews$ = this.store.pipe(select(fromNews.getNews));
        this.toastr.success('Se ha eliminado correctamente la noticia');
      },
      error => {
        this.toastr.error(
          'ERROR',
          'Ha ocurrido un error al eliminar la noticia '
        );
      }
    );
  }

  voteNews(vote: string, idNews: number) {
    if (!localStorage.getItem('id_token')) {
      return this.isAuth();
    }
    this.newsServices.voteNews(vote, idNews).subscribe(res => {
      this.store.dispatch(new newsActions.LoadNews());
      this.allNews$ = this.store.pipe(select(fromNews.getNews));
      this.error$ = this.store.pipe(select(fromNews.getError));
    });
  }

  gotoNews(idNews: number) {
    this.router.navigate(['/news/' + idNews]);
  }

  isAuth() {
    this.toastr.warning(
      'INFO',
      'Necesita estar autenticado para utilizar esta función'
    );
    this.router.navigate(['/auth/login']);
  }
}
