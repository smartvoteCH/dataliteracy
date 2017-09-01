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
  private contactSubjectPrefix = 'Kontaktformular Data Literacy:';
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
      subject: `${this.contactSubjectPrefix} ${subject}`,
      message: `
        <p>Von: ${name}</p>
        <p>Email: ${email}</p>
        <br/>
        <br/>
        ${message}`
    };
    return this.sendMessage(postMessage);
  }

  private sendMessage(postMessage: Message): Observable<Message> | any {
  return this.http.post(this.emailScriptUrl, postMessage)
    .map(response => {
      // console.log('sending email was successful', response);
    })
    .catch(error => {
      // console.log('sending email failed', error);
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
    return this.sendMessage(postMessage);
  }

}
