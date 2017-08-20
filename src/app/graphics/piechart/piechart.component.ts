import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart } from '../../models/chart.model';

import * as d3Select from 'd3-selection';
import * as d3Shape from 'd3-shape';

const height = 200;
const width = 200;
const radius = Math.min(width, height) / 2;

@Component({
  selector: 'dl-piechart',
  template: '',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  @Input() chart: Chart;

  constructor(private rootElement: ElementRef) { }

  ngOnInit() {
    const svg = d3Select.select(this.rootElement.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const pie = d3Shape.pie()
      .sort(null)
      .value((d) => d.value);

    const path = d3Shape.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const arc = g.selectAll('.arc')
      .data(pie(this.chart.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc.append('path')
        .attr('d', path)
        .attr('fill', (d) => d.data.color );

    if (this.chart.renderLabels) {

      const label = d3Shape.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      arc.append('text')
          .attr('transform', (d) => `translate(${label.centroid(d)})`)
          .attr('dy', '0.35em')
          .text((d) => d.data.name );
    }
  }

}
