import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Question, QuestionModel, TextPart } from '../models/question.model';

export class MockQuestionService {
  getQuestions(key: string): Observable<Question> {
    return Observable.from([
      new QuestionModel('Question', [new TextPart('Description')], [new TextPart('Answer')]),
    ]);
  }
}
