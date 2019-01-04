import { Component, OnInit, Inject } from '@angular/core';
import { TvShowService } from '../services/tv-show.service';
import { TvShow } from '../models/tv-show';
import { SelectionModel } from '@angular/cdk/collections';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.css'],
  providers: [TvShowService]
})
export class TvShowListComponent implements OnInit {
  tvShowsArray: Array<TvShow> = [];
  displayedColumns: string[] = ['select', 'title', 'actor', 'scoring', 'image'];

  dataSource = new MatTableDataSource<TvShow>(this.tvShowsArray);
  selection = new SelectionModel<TvShow>(true, []);

  constructor(private tvShowService: TvShowService, private toastr: ToastrService, private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllTvShow();
  }

  loadAllTvShow() {
    this.tvShowService.listAllTvShows().subscribe(
      data => {
        this.tvShowsArray = data;
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectedTvShows() {
    return this.selection.selected.length;
  }

  deleteManyTvShow() {
    this.selection.selected.forEach(data => {
      this.deleteTvShow(data._id);
    });
  }

  deleteTvShow(id: string) {
    this.tvShowService.deleteTvShow(id).subscribe(
      data => {
        this.toastr.success(
          data.title,
          'Has eliminano correctamente la serie:'
        );
        this.loadAllTvShow();
      }
    );
  }

  goToEdit() {
    this.router.navigate(['/tvshows/create'], { queryParams: { id: this.selection.selected[0]._id, update: true } });
  }

}
