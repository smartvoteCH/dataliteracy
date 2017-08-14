import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { ChartData } from '../../models/chart.model';

import * as d3Select from 'd3-selection';

@Component({
  selector: 'dl-barchart',
  template: '',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() chartData: ChartData;

  constructor(private rootElement: ElementRef) { }

  ngOnInit() {
    d3Select.select(this.rootElement.nativeElement)
      .selectAll('div')
      .data(this.chartData)
      .enter()
      .append('div')
      .style('height', (d) => `${d.value * 5}px`)
      .style('background-color', (d) => d.color);
    }

}
