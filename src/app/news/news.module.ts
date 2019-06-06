import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NewsRoutingModule } from './news-routing.module';
import {
  NewsListComponent,
  SnackBarVoteComponent
} from './news-list/news-list.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { newsReducer } from './state/news.reducers';
import { NewsEffect } from './state/news.effects';

import { AllMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NewsDetailComponent,
  DialogOverviewExampleDialog
} from './news-detail/news-detail.component';
import { commentReducer } from './state/comment.reducers';
import { CommentEffect } from './state/comment.effects';

import { NewsGraphqlService } from './graphql-services/news.graphql.service'

@NgModule({
  declarations: [
    NewsListComponent,
    NewsFormComponent,
    NewsDetailComponent,
    DialogOverviewExampleDialog,
    SnackBarVoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule,
    StoreModule.forFeature('news', newsReducer),
    StoreModule.forFeature('comment', commentReducer),
    EffectsModule.forFeature([NewsEffect, CommentEffect]),
    AllMaterialModule,
    FlexLayoutModule,
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
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    NewsDetailComponent,
    DialogOverviewExampleDialog,
    NewsListComponent,
    SnackBarVoteComponent
  ],
  providers: [NewsGraphqlService]
})
export class NewsModule {}
