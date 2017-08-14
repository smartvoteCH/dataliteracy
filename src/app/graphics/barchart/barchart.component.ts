import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart } from '../../models/chart.model';

import * as d3Select from 'd3-selection';

const height = 200;
const width = 200;

@Component({
  selector: 'dl-barchart',
  template: '',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() chart: Chart;

  constructor(private rootElement: ElementRef) { }

  ngOnInit() {
    const svg = d3Select.select(this.rootElement.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const itemWidth = width / this.chart.data.length;
    const itemPadding = 1;
    const scale = 10;

    svg.selectAll('rect')
      .data(this.chart.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * itemWidth)
      .attr('y', (d) => height - d.value * scale)
      .attr('width', itemWidth - itemPadding)
      .attr('height', (d) => d.value * scale)
      .attr('fill', (d) => d.color || `rgb(0, 0, ${Math.round(d * 10)})`);
    }

}
