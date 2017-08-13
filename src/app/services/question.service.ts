import { Injectable } from '@angular/core';

import { Question } from '../models/question.model';

@Injectable()
export class QuestionService {

  private _cache = {};

  private _questions = [
    new Question('Frage 1', 'Beschreibung 1', 'Antwort 1'),
    new Question('Frage 2', 'Beschreibung 2', 'Antwort 2'),
    new Question('Frage 3', 'Beschreibung 3', 'Antwort 3')
  ];

  constructor() { }

  getQuestions(key: string): Question[] {
    if (!this._cache[key]) {
      console.log('cache miss for', key);
      // TODO load from file here
      this._cache[key] = this._questions;

    }
    return this._cache[key];
  }

}
