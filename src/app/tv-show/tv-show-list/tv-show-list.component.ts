import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TvShowService } from '../services/tv-show.service';
import { TvShow } from '../models/tv-show';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, State, select } from '@ngrx/store';
import * as tvShowActions from '../state/tv-show.actions';
import * as fromTvShow from '../state/tv-show.reducers';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.css'],
  providers: [TvShowService]
})
export class TvShowListComponent implements OnInit {
  tvShowsArray: Array<TvShow> = [];
  displayedColumns: string[] = ['select', 'title', 'actor', 'scoring', 'image'];

  allTvShows$: Observable<Array<TvShow>>;
  error$: Observable<String>;

  dataSource = new MatTableDataSource<TvShow>(this.tvShowsArray);
  selection = new SelectionModel<TvShow>(true, []);

  constructor(
    private tvShowService: TvShowService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<fromTvShow.AppState>,
    private translate: TranslateService
  ) {
    translate.use('en');
  }

  ngOnInit() {
    this.store.dispatch(new tvShowActions.LoadTvShows());
    this.allTvShows$ = this.store.pipe(select(fromTvShow.getTvShows));
    this.error$ = this.store.pipe(select(fromTvShow.getError));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectedTvShows() {
    return this.selection.selected.length;
  }

  deleteManyTvShow() {
    this.selection.selected.forEach(data => {
      this.deleteTvShow(data.id);
    });
  }

  deleteTvShow(id: string) {
    this.store.dispatch(new tvShowActions.DeleteTvShow(id));
    return this.toastr.success(id, 'Has eliminado correctamente la serie: ');
  }

  goToEdit() {
    this.router.navigate(['/tvshows/create'], {
      queryParams: { id: this.selection.selected[0].id, update: true }
    });
  }
}
