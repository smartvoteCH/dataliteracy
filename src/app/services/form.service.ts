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
  private emailSmartvote = 'kontakt@smartvote.ch';
  private nameSmartvote = 'smartvote';
  private contactSubjectPrefix = 'Kontaktformular Data Literacy:';
  private sendLinkSubject = 'Nacht der Forschung 2017: Data Literacy-Link';
  private sendLinkMessage = `
    <p>Vielen Dank für Ihren Besuch an der Nacht der Forschung und des smartvote-Standes. Unsere Data Literacy-Applikation finden Sie unter:<br/>
    <a href="http://dataliteracy.smartvote.ch">dataliteracy.smartvote.ch</a>
    <br/>
    <p>Freundliche Grüsse,<br/>
      Ihr smartvote-Team
    </p>
    ----------------------------------------------------<br/>
    <p>smartvote<br/><br/>
    +41 (0)33 534 99 15<br/>
    <a href="mailto:kontakt@smartvote.ch">kontakt@smartvote.ch</a><br/>
    <br/>
    <a href="http://www.smartvote.ch">www.smartvote.ch</a><br/>
    <a href="http://www.twitter.com/smartvoteCH">www.twitter.com/smartvoteCH</a><br/>
    <a href="http://www.facebook.com/smartvote.ch">www.facebook.com/smartvote.ch</a><br/>
    <br/>
    smartvote<br/>
    Postfach 834<br/>
    CH-3000 Bern 9<br/>
    Switzerland
    </p>
    ----------------------------------------------------<br/>
    <p>Unterstützen Sie smartvote!<br/>
    Weitere Informationen unter: www.smartvote.ch/donate<br/>
    => Spendenkonto PC 30-666488-8</p>
    ----------------------------------------------------<br/>
    `;



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
