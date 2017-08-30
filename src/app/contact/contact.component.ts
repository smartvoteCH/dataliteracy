import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from '../services/form.service';

@Component({
  selector: 'dl-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  _status: string;

  constructor(private _formService: FormService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (form.valid && !value.uid) {
      this._formService.sendContactForm(value.uid,
        `${value.firstname} ${value.name}`,
        value.mail,
        value.subject,
        value.message
      ).subscribe(_ => {
          this._status = 'success';
        }, _ =>  {
          this._status = 'send_error';
        });
    } else {
      this._status = 'validation_error';
    }
  }

  public get status(): string {
    return this._status;
  }

}
