import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dl-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle('NdF 2017 – Data Literacy: Impressum');
  }

  ngOnInit() {
  }

}
