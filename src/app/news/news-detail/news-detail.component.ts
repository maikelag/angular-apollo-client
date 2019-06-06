import { Component, OnInit, Inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Comment } from '../models/comment.model';
import { News } from '../models/news.model';

import { Store, State, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as newsActions from '../state/news.actions';
import * as commentActions from '../state/comment.actions';
import * as fromNews from '../state/news.reducers';
import * as fromComment from '../state/comment.reducers';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  commentsArray: Array<Comment> = [];
  newsDetail: News;
  commentToSend: Comment = new Comment();

  allComments$: Observable<Array<Comment>>;
  error$: Observable<String>;

  constructor(
    private newsServices: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromNews.AppState>,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.newsDetail = new News();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsServices.findOneNews(params.id).subscribe(news => {
        this.newsDetail = news;
        this.store.dispatch(new commentActions.LoadComments(params.id));
        this.allComments$ = this.store.pipe(select(fromComment.getComments));
      });
      this.newsServices.commentOfNews(params.id).subscribe(comments => {
        this.commentsArray = comments;
      });
    });
  }

  voteComment(vote: string, idComment: number) {
    if (!localStorage.getItem('id_token')) {
      return this.isAuth();
    }
    this.store.dispatch(new commentActions.VoteComment({vote, idComment}));
  }

  isAuth() {
    this.toastr.warning(
      'INFO',
      'Necesita estar autenticado para realizar esa función'
    );
    this.router.navigate(['/auth/login']);
  }

  comment(comment: Comment) {
    this.newsServices.commentNews(comment, this.newsDetail.id).subscribe(
      res => {
       this.toastr.success('OK', 'Se ha insertado correctamente el comentario');
      },
      error => {
        this.toastr.error('Error', 'Ha ocurrido un error');
      }
    );
  }

  openDialog(commentId: number): void {
    this.commentToSend.fatherComment = commentId;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: {comment: this.commentToSend}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.comment(this.commentToSend);
      this.commentToSend = new Comment();
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Comment) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCommentClick(): void {
    this.dialogRef.close();
  }
}