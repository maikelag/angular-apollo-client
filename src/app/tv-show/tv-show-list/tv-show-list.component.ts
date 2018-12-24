import { Component, OnInit } from '@angular/core';
import { TvShowService } from '../services/tv-show.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.css'],
  providers: [TvShowService]
})
export class TvShowListComponent implements OnInit {
  tvShowsArray: [];

  constructor(private tvShowService: TvShowService) {
    this.tvShowsArray = [];
  }

  ngOnInit() {
    this.tvShowService.allTvShows().subscribe(
      tvShows => {
        this.tvShowsArray = tvShows;
      }
    )
  }

}
