import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as authUtils from './auth/utils/auth-utils';
import { SecurityService } from './auth/services/security.service';
import { TvShow } from './tv-show/models/tv-show';

import { TvShowService } from './tv-show/services/tv-show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SecurityService, TvShowService]
})
export class AppComponent implements OnInit {
  title = 'Example NGRX';
  arrayTvShows: Array<TvShow> = [];
  arrayTvShowsObs$: Observable<TvShow>;

  public activeLang = 'es';

  constructor(
    private securityService: SecurityService,
    private tvShowService: TvShowService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit() {
    this.arrayTvShowsObs$ = this.tvShowService.listAllTvShows();
  }

  logout() {
    this.securityService.logout();
  }

  isLogout(): boolean {
    return authUtils.isLogout();
  }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}
