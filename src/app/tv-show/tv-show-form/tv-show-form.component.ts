import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { TvShow } from '../models/tv-show';
import { TvShowService } from '../services/tv-show.service';

declare var $: any;

@Component({
  selector: 'app-tv-show-form',
  templateUrl: './tv-show-form.component.html',
  styleUrls: ['./tv-show-form.component.css'],
  providers: [TvShowService]
})
export class TvShowFormComponent implements OnInit {
  tvShowForm: FormGroup;
  tvShow: TvShow;
  update: boolean;
  idSelected: string;

  constructor(
    public tvFB: FormBuilder,
    private tvServices: TvShowService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.update = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.update) {
          this.update = true;
          this.idSelected = params.id;
          this.findOne(params.id);
        }
      }
    );
    this.createTvShowForm();
  }

  createTvShowForm() {
    this.tvShowForm = this.tvFB.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      actor: ['', [Validators.required]],
      scoring: [
        5,
        [Validators.required, Validators.max(10), Validators.min(0)]
      ],
      image: []
    });
  }

  saveTvShow(tvShow: TvShow) {
    this.tvServices.createTvShow(tvShow).subscribe(response => {
      this.toastr.success(
        response.data.title,
        'Has creado correctamente la serie:'
      );
      return this.router.navigateByUrl('tvshows');
    });
  }

  updateTvShow(id, tvShow: TvShow) {
    this.tvServices.updateTvShow(id, tvShow).subscribe(response => {
      this.toastr.success(
        'dddd',
        'Has creado correctamente la serie:'
      );
      console.log(response);
      return this.router.navigateByUrl('tvshows');
    });
  }

  cleanTvShowForm() {
    this.tvShowForm.reset();
  }

  goListTvShows() {
    return this.router.navigateByUrl('tvshows');
  }

  submit() {
    if (this.tvShowForm.valid) {
      const files = $('#file-upload-input')[0].files;
        if (files.length > 0) {
          this.tvShowForm.get('image').setValue(files[0].result);
          $('#image-tvshow')
            .removeClass('fileinput-exists')
            .addClass('fileinput-new');
          $('#image-tvshow img').detach();
        }
        const tvShowNew = plainToClass(TvShow, this.tvShowForm.value as TvShow);
      if (!this.update) {
        this.saveTvShow(tvShowNew);
      } else {
        this.updateTvShow(this.idSelected, tvShowNew);
      }
    }
  }

  findOne(id: string) {
    this.tvServices.findOneTvShow(id).subscribe(
      tvShowSelected => {
        this.tvShowForm.setValue({
          title: tvShowSelected.title,
          description: tvShowSelected.description,
          actor: tvShowSelected.actor,
          scoring: tvShowSelected.scoring,
          image: ''
        });
        if (tvShowSelected.image) {
          $('#image-tvshow').addClass('fileinput-exists').removeClass('fileinput-new');
          $('#image-tvshow>div.thumbnail').append('<img>');
          $('#image-tvshow>div img').attr('src', 'http://127.0.0.1:3000/' + tvShowSelected.image);
        } else {
          $('#image-tvshow').removeClass('fileinput-exists').addClass('fileinput-new');
          $('#image-tvshow img').attr('src', "''").hide();
        }
      },

      error => {}
    );
  }

}
