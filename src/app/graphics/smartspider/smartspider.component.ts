import { Component, OnInit, Input } from '@angular/core';

import { Smartspider } from '../../models/smartspider.model';

@Component({
  selector: 'dl-smartspider',
  templateUrl: './smartspider.component.html',
  styleUrls: ['./smartspider.component.css']
})
export class SmartspiderComponent implements OnInit {

  @Input() smartspider: Smartspider;

  constructor() { }

  ngOnInit() {
    console.log('in smartspider component', this.smartspider);
  }

}
