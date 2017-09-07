import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { FormService } from '../services/form.service';

@Component({
  selector: 'dl-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  _status: string;

  constructor(private _formService: FormService, titleService: Title) {
    titleService.setTitle('NdF 2017 – Data Literacy: Kontakt');
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (form.valid && !value.uid) {
      this._status = 'in_progress';
      this._formService.sendContactForm(value.uid,
        `${value.firstname} ${value.name}`,
        value.mail,
        value.subject,
        value.message
      ).subscribe(_ => {
          this._status = 'success';
          form.reset();
        }, _ =>  {
          this._status = 'send_error';
        });
    } else {
      // mark all controls as touched
      for (const key in form.controls) {
        if (form.controls.hasOwnProperty(key)) {
          form.controls[key].markAsTouched();
        }
      }
      this._status = 'validation_error';
    }
  }

  public get status(): string {
    return this._status;
  }

}
