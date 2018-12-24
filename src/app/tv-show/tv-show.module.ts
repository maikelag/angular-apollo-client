import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TvShowRoutingModule } from './tv-show-routing.module';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';

@NgModule({
  declarations: [TvShowListComponent],
  imports: [
    CommonModule,
    TvShowRoutingModule,
    HttpClientModule
  ]
})
export class TvShowModule { }
