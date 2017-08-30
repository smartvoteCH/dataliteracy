import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

export interface Message {
  uid: string;
  emailto: string;
  emailfrom: string;
  namefrom: string;
  subject: string;
  message: string;
}

@Injectable()
export class FormService {

  private emailScriptUrl = '/assets/email.php';

  // mail contents
  private emailSmartvote = 'stefani.gerber@politools.net'; // 'kontakt@smartvote.ch';
  private nameSmartvote = 'smartvote';
  private sendLinkSubject = 'Nacht der Forschung: Data Literacy';
  private sendLinkMessage = `Danke für Ihren Besuch. Sie finden unseren Stand unter
  <a href="http://dataliteracy.smartvote.ch">dataliteracy.smartvote.ch</a>`;



  constructor(private http: Http) { }

  sendContactForm(uid: string, name: string, email: string, subject: string, message: string): Observable<Message> | any {
    const postMessage = {
      uid: uid,
      emailto: this.emailSmartvote,
      emailfrom: email,
      namefrom: name,
      subject: subject,
      message: message
    };
    console.log(postMessage);
    return this.http.post(this.emailScriptUrl, postMessage)
      .map(response => {
        console.log('sending email was successful', response);
      })
      .catch(error => {
        console.log('sending email failed', error);
        return Observable.throw(error);
      });
  }

  sendLink(uid: string, mail: string): Observable<Message> | any {
    const postMessage = {
      uid: uid,
      emailto: mail,
      emailfrom: this.emailSmartvote,
      namefrom: this.nameSmartvote,
      subject: this.sendLinkSubject,
      message: this.sendLinkMessage
    };
  }

}
