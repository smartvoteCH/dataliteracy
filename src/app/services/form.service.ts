import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormService {

  constructor(private http: Http) { }

  sendContactForm(values: any): Observable<any> {
    const url = `./contact_form.php`;
    return this.http.post(url, JSON.stringify(values));
  }

}
