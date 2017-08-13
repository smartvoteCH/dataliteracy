import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Question, QuestionModel } from '../models/question.model';

@Injectable()
export class QuestionService {

  private _cache = {};

  private _questions = [
    new QuestionModel('Frage 1', 'Beschreibung 1', 'Antwort 1'),
    new QuestionModel('Frage 2', 'Beschreibung 2', 'Antwort 2'),
    new QuestionModel('Frage 3', 'Beschreibung 3', 'Antwort 3')
  ];

  constructor(private http: Http) { }

  public getQuestions(key: string): Observable<Question[]> {
    if (!this._cache[key]) {
      this._cache[key] = this.loadData(key);
    }
    return this._cache[key];
  }

  private loadData(key: string): Observable<Question[]> {
    const url = `./assets/data/${key}.json`;
    return this.http.get(url)
      .map((res: any) => {
        const json = res.json();
        return json.map(data => {
          return QuestionModel.fromJSON(data);
        });
      });
  }
}
