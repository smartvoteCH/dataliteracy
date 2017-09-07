import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { FormService } from '../services/form.service';

@Component({
  selector: 'dl-sendlink',
  templateUrl: './sendlink.component.html',
  styleUrls: ['./sendlink.component.css']
})
export class SendlinkComponent implements OnInit {

  _status: string;

  constructor(private _formService: FormService, titleService: Title) {
    titleService.setTitle('NdF 2017 – Data Literacy: Link versenden');
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    if (form.valid && !value.uid) {
      this._status = 'in_progress';
      this._formService.sendLink(value.uid,
        value.mail
      ).subscribe(_ => {
          this._status = 'success';
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
