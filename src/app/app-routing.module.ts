import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { RawNewsListComponent } from './raw-news/raw-news-list/raw-news-list';
import { AuthGuard } from './auth/utils/auth.guard';
import { TvShowModule } from './tv-show/tv-show.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { FullLayoutComponent } from './layout/full-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'raw-news',
    component: RawNewsListComponent
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => AuthModule
      },
      {
        path: 'news',
        loadChildren: () => NewsModule
      },
      {
        path: 'tvshows',
        loadChildren: () => TvShowModule,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
