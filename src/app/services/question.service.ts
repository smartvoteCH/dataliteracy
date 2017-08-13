import { Injectable } from '@angular/core';

@Injectable()
export class QuestionService {

  private _cache = {};

  private _questions = [
    {
      title: 'Question 1',
      description: 'Description 1',
      answer: 'Answer1'
    },
    {
      title: 'Question 2',
      description: 'Description 2',
      answer: 'Answer2'
    },
    {
      title: 'Question 3',
      description: 'Description 3',
      answer: 'Answer3'
    },
  ];

  constructor() { }

  getQuestions(key: string) {
    if (!this._cache[key]) {
      console.log('cache miss for', key);
      // TODO load from file here
      this._cache[key] = this._questions;

    }
    return this._cache[key];
  }

}
