import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { TvShowRoutingModule } from './tv-show-routing.module';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { TvShowFormComponent } from './tv-show-form/tv-show-form.component';
import { AllMaterialModule } from '../material.module';

import { JwtInterceptor } from '../auth/utils/jwt.interceptor';
import { ErrorInterceptor } from '../auth/utils/error.interceptor';

@NgModule({
  declarations: [TvShowListComponent, TvShowFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TvShowRoutingModule,
    HttpClientModule,
    AllMaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class TvShowModule { }
