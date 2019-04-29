import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

// NGRX Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TvShowEffect } from './state/tv-show.effects';
import { tvShowReducer} from './state/tv-show.reducers';

import { TvShowRoutingModule } from './tv-show-routing.module';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { TvShowFormComponent } from './tv-show-form/tv-show-form.component';
import { AllMaterialModule } from '../material.module';

import { JwtInterceptor } from '../auth/utils/jwt.interceptor';
import { ErrorInterceptor } from '../auth/utils/error.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [TvShowListComponent, TvShowFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TvShowRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('tvShows', tvShowReducer),
    EffectsModule.forFeature([TvShowEffect]),
    AllMaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class TvShowModule { }
