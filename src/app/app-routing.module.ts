import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/utils/auth.guard';
import { TvShowModule } from './tv-show/tv-show.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => AuthModule
      },
      {
        path: 'tvshows',
        loadChildren: () => TvShowModule,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tvshows', loadChildren: () =>  TvShowModule },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
