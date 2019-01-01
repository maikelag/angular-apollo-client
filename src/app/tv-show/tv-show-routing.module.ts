import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvShowListComponent } from './tv-show-list/tv-show-list.component';
import { TvShowFormComponent } from './tv-show-form/tv-show-form.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowListComponent
  },
  {
    path: 'create',
    component: TvShowFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowRoutingModule { }
