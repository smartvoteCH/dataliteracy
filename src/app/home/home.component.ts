import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(titleService: Title) {
    titleService.setTitle('NdF 2017 – Data Literacy');
  }

  ngOnInit() {
  }

}
