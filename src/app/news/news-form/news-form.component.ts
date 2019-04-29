import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
  providers: [NewsService, ToastrService]
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  newsArray: News[];

  constructor(
    public newsFB: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private newsServices: NewsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createNewsForm();
  }

  createNewsForm() {
    this.newsForm = this.newsFB.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      source: ['', [Validators.required]],
      image: []
    });
  }

  saveNews(news: News) {
    this.newsServices.createNews(news).subscribe(response => {
      this.toastr.success(response.title, 'Has creado correctamente la serie:');
      return this.router.navigateByUrl('news');
    });
  }

  submit() {
    if (this.newsForm.valid) {
      const newsNew = plainToClass(News, this.newsForm.value as News);
      this.saveNews(newsNew);
    }
  }

  cleanNewsForm() {}

  goListNews() {
    return this.router.navigateByUrl('news');
  }
}
