import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Question, QuestionModel } from '../models/question.model';

export class MockQuestionService {
  getQuestions(key: string): Observable<Question> {
    return Observable.from([
      new QuestionModel('Question', 'Description', 'Answer'),
    ]);
  }
}
