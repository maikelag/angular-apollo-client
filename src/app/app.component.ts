import { Component, OnInit } from '@angular/core';
import { Observable, of, from} from 'rxjs';
import { map, delay, filter} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import * as authUtils from './auth/utils/auth-utils';
import { SecurityService} from './auth/services/security.service';
import { TvShow } from './tv-show/models/tv-show';

import { TvShowService } from './tv-show/services/tv-show.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SecurityService, TvShowService ]
})
export class AppComponent implements OnInit {
  title = 'Example NGRX';
  lista = of('Hey guys');
  flag;
  arrayTvShows: Array<TvShow> = [];
  arrayTvShowsObs$: Observable<TvShow>;

  constructor(private securityService: SecurityService, private tvShowService: TvShowService) {}

  ngOnInit() {
    this.lista.subscribe((x: any) => this.flag = x);
    this.arrayTvShowsObs$ = this.tvShowService.listAllTvShows();
  }

  logout() {
    this.securityService.logout();
  }

  isLogout(): boolean {
    return authUtils.isLogout();
  }
}
