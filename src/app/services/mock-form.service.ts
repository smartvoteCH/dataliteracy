import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';


export class MockFormService {
  sendContactForm(values: any): Observable<any> {
    return Observable.from(null);
  }
}
