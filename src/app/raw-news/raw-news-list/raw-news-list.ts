import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RawNewsService } from '../services/raw-news.service';

declare var $: any;

@Component({
  selector: 'app-raw-news-list',
  templateUrl: './raw-news-list.html',
  styleUrls: ['./raw-news-list.css'],
  providers: [RawNewsService]
})
export class RawNewsListComponent implements OnInit {
  rawNewsForm: FormGroup;
  rawNews: Array<any> = [];
  sourceArray: Array<String> = [
    'http://127.0.0.1/rss-a-probar/cubaahorafeed.xml',
    'http://127.0.0.1/rss-a-probar/insmet.xml'
  ];

  selectedFile: File;

  constructor(private rawNewsService: RawNewsService, public fb: FormBuilder) {}

  ngOnInit() {
    this.createNewsForm();
    this.loadAllRawNews();
  }

  loadAllRawNews() {
    this.rawNewsService.allRawNews().subscribe((raw: any) => {
      this.rawNews = raw;
    });
  }

  getInfoOfSources() {
    const idSourceSelected = $('#externalSources').val();
    this.rawNewsService
      .rawNewsBySource(idSourceSelected)
      .subscribe((infosRaw: any) => {
        this.rawNews = infosRaw;
      });
  }

  createNewsForm() {
    this.rawNewsForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: ['', Validators.required],
      image: [null]
    });
  }

  createNews() {
    const news = {
      title: this.rawNewsForm.value.title,
      description: this.rawNewsForm.value.description,
      author: this.rawNewsForm.value.author,
      image: this.rawNewsForm.value.image,
    };
    this.rawNewsService.createRawNewsManual(news).subscribe(
      (data: any) => {
        this.rawNewsForm.reset();
        alert('Noticia creada correctamente: ' + data.title);
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.rawNewsForm.patchValue({image: this.selectedFile});
  }
}
