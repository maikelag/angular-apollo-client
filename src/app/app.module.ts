import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// ngrx modules

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RawNewsListComponent } from './raw-news/raw-news-list/raw-news-list';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AllMaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { FullLayoutComponent } from './layout/full-layout.component';

import { JwtInterceptor } from './auth/utils/jwt.interceptor';
import { ErrorInterceptor } from './auth/utils/error.interceptor';
import { TvShowModule } from './tv-show/tv-show.module';
import { NewsModule } from './news/news.module';

import { counterReducer } from './state/counter.reducers';
import { errorReducer } from './state/error.reducers';
import { MycounterComponent } from './mycounter/mycounter.component';

import { snackBarReducer } from './shared/state/snack-bar.reducers';
import { SnackbarEffects } from './shared/state/snack-bar.effects';
import { ErrorEffects } from './shared/state/error.effects';
import { GraphQLModule } from './graphql/graphql.module';

@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent, AdminComponent, FullLayoutComponent, RawNewsListComponent, MycounterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    GraphQLModule,
    StoreModule.forRoot({count: counterReducer, errors: errorReducer, snackbar: snackBarReducer}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([SnackbarEffects, ErrorEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    AllMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FlexLayoutModule,
    TvShowModule,
    NewsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
