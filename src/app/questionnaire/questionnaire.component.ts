import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/takeWhile';

import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'dl-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  private _ready: boolean;
  private _open: boolean;
  private _index: number;
  private _alive: boolean;
  private _questions: Question[];
  private _currentPage;


  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService, titleService: Title) {
    titleService.setTitle('NdF 2017 – Data Literacy');
  }

  ngOnInit() {
    this._alive = true;
    this._ready = false;
    this._open = false;
    this._index = 0;
    this._currentPage = this.router.url.split('/')[1];

    this.questionService.getQuestions(this.currentPage)
      .takeWhile(() => this._alive)
      .subscribe((questions: any) => {
        this._questions = questions;
        this._ready = true;
      });

    this.route.params.takeWhile(() => this._alive).subscribe(
      (params: Params) => {
        if (params.id) {
          this._index = +params.id;
          this._open = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this._alive = false;
  }

  get ready(): boolean {
    return this._ready;
  }

  get isOpen(): boolean {
    return this._open;
  }

  toggleOpen(): void {
    this._open = !this._open;
  }

  get currentPage(): string {
    return this._currentPage;
  }

  get currentQuestion() {
    if (typeof this._index !== 'undefined' && this._questions) {
      return this._questions[this._index];
    }
    return null;
  }

  get hasPrevious(): boolean {
    return this._index > 0;
  }

  get hasNext(): boolean {
    return this._index < this._questions.length - 1;
  }

  get index(): number {
    return this._index;
  }
}
