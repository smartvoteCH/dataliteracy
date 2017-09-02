// can't get exclusion to work otherwise
/* tslint:disable */
import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core'
import * as d3Scale from 'd3-scale'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'

const height = 450
const width = 450
let r = d3Scale.scaleLinear().domain([0, 100]).range([7, 187])

@Component({
  selector: 'dl-smartspider',
  template: '',
  styles: [`
  `]
})
export class SmartspiderComponent implements OnInit, OnChanges {

  @Input() candidateSmartspider: any;
  @Input() voterSmartspider: any;
  @Input() showCandidateSpider: boolean;
  @Input() showVoterSpider: boolean;
  private _initialized: boolean = false;

  constructor(public myElement: ElementRef) {
  }

  ngOnInit() {
    this.drawSmartspiderBackground(this.myElement.nativeElement);
    this._initialized = true;
    this.ngOnChanges({});
  }

  ngOnChanges(changes: any) {
    if (!this._initialized) return;
    const smartspiderElement = d3Select.select(this.myElement.nativeElement).select('.smartspider')

    this.eraseSmartspider(smartspiderElement)

    if (this.candidateSmartspider && this.showCandidateSpider) {
      this.drawCircularScale(smartspiderElement, this.candidateSmartspider)
    } else if (this.voterSmartspider && this.showVoterSpider) {
      this.drawCircularScale(smartspiderElement, this.voterSmartspider)
    }

    if (this.candidateSmartspider && this.showCandidateSpider) {
      this.drawAreas(smartspiderElement, this.candidateSmartspider, false)
    }
    if (this.voterSmartspider && this.showVoterSpider) {
      this.drawAreas(smartspiderElement, this.voterSmartspider, true)
    }

    if (this.candidateSmartspider && this.showCandidateSpider) {
      this.drawCircularAxis(smartspiderElement, this.candidateSmartspider)
    } else if (this.voterSmartspider && this.showVoterSpider) {
      this.drawCircularAxis(smartspiderElement, this.voterSmartspider)
    }

    if (this.candidateSmartspider && this.showCandidateSpider) {
      this.drawPositionsOnAxis(smartspiderElement, this.candidateSmartspider, false)
    }
    if (this.voterSmartspider && this.showVoterSpider) {
      this.drawPositionsOnAxis(smartspiderElement, this.voterSmartspider, true)
    }

    d3Select.select(this.myElement.nativeElement).append('div').attr('id', 'rendered')
  }

  eraseSmartspider (smartspiderElement) {
    smartspiderElement.selectAll('*').remove()
  }

  drawAreas (smartspiderElement, smartspider, isVoter) {
    const startAngle = Math.PI / 2
    const deltaAngle = -2 * Math.PI / smartspider.smartspider.length

    for (let k = 0; k < smartspider.smartspider.length; k++) {
      const area = [[
        Math.cos(startAngle + k * deltaAngle) * r(smartspider.smartspider[k].value),
        -Math.sin(startAngle + k * deltaAngle) * r(smartspider.smartspider[k].value)
      ], [
        k === smartspider.smartspider.length - 1 ?
          Math.cos(startAngle) * r(smartspider.smartspider[0].value)
          : Math.cos(startAngle + (k + 1) * deltaAngle) * r(smartspider.smartspider[k + 1].value),
        k === smartspider.smartspider.length - 1 ?
          -Math.sin(startAngle) * r(smartspider.smartspider[0].value)
          : -Math.sin(startAngle + (k + 1) * deltaAngle) * r(smartspider.smartspider[k + 1].value)
      ]]

      const areaPath = d3Shape.area()
        .x0(0)
        .x1(function(d) {
          return d[0]
        })
        .y0(0)
        .y1(function(d) {
          return d[1]
        })

        let pathClass = ''
        if (isVoter) {
          pathClass = 'voter-color'
        } else {
          pathClass = 'party-color_' + smartspider.partyColorGroup
        }
      smartspiderElement.append('path')
        .data([area])
        .attr('class', pathClass)
        .attr('d', areaPath)
        .attr('stroke-width', 2)
        .attr('opacity', 0.5)
    }
  }
  drawPositionsOnAxis (smartspiderElement, smartspider, isVoter) {
    const nofCleavageValues = smartspider.smartspider.length
    const startAngle = Math.PI / 2
    const deltaAngle = -2 * Math.PI / nofCleavageValues
    let circleClass = ''
    if (isVoter) {
      circleClass = 'voter-color'
    } else {
      circleClass = 'party-color_' + smartspider.partyColorGroup
    }
    for (let i = 0; i < nofCleavageValues; i++) {
      // draw position circles on axis
      smartspiderElement.append('circle')
        .attr('class', circleClass)
        .attr('cx', Math.cos(startAngle + i * deltaAngle) * r(smartspider.smartspider[i].value))
        .attr('cy', -Math.sin(startAngle + i * deltaAngle) * r(smartspider.smartspider[i].value))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('r', 4)
        .append('title').html(String(Math.round(smartspider.smartspider[i].value)))
    }
  }

  drawCircularAxis (smartspiderElement, smartspider) {
    let arc = null
    const nofCleavageValues = smartspider.smartspider.length
    const innerRadius = 7
    const outerRadius = 195
    const startAngle = Math.PI / 2
    const deltaAngle = -2 * Math.PI / nofCleavageValues

    // center circle
    smartspiderElement.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', '7px')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '4px')

    for (let i = 0; i < nofCleavageValues; i++) {
      const currAngle = startAngle + i * deltaAngle
      const x1 = Math.cos(startAngle + i * deltaAngle) * innerRadius
      const y1 = -Math.sin(startAngle + i * deltaAngle) * innerRadius

      const x2 = Math.cos(startAngle + i * deltaAngle) * outerRadius
      const y2 = -Math.sin(startAngle + i * deltaAngle) * outerRadius

      // draw axis
      smartspiderElement.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke-width', 4)
        .attr('stroke', 'black')
        .attr('stroke-linecap', 'round')

      // draw axis labels
      let factor = 1
      let translation = 0
      if (Math.sin(currAngle) < 0) {
        factor = -1
        translation = 5
      }

      if (smartspider.smartspider[i].name.length >= 20) {
        const splittedText = smartspider.smartspider[i].name.split(' ')
        let outerText = ''
        let innerText = ''
        let inner = false
        for (let j = 0; j < splittedText.length; j++) {
          if (outerText.length + splittedText[j].length >= smartspider.smartspider[i].name.length / 2 || inner) {
            innerText += splittedText[j] + ' '
            inner = true
          } else {
            outerText += splittedText[j] + ' '
          }
        }
        arc = d3Shape.arc()
          .innerRadius(205 + factor * 5 + translation)
          .outerRadius(205 + factor * 5 + translation)
          .startAngle(i * 2 * Math.PI / nofCleavageValues - factor * Math.PI / nofCleavageValues)
          .endAngle(i * 2 * Math.PI / nofCleavageValues + factor * Math.PI / nofCleavageValues)

        smartspiderElement.append('path')
          .attr('id', 'path' + i + 'outer')
          .attr('d', arc)

        smartspiderElement.append('text')
          .style('font-size', '10px')
          .style('font-weight', 'bold')
          .attr('font-family', 'sans-serif')
          .attr('text-anchor', 'middle')
          .append('textPath')
          .attr('xlink:href', window.location.href + '#path' + i + 'outer')
          .attr('startOffset', '25%')
          .text(outerText)

        arc = d3Shape.arc()
          .innerRadius(205 - factor * 5 + translation)
          .outerRadius(205 - factor * 5 + translation)
          .startAngle(i * 2 * Math.PI / nofCleavageValues - factor * Math.PI / nofCleavageValues)
          .endAngle(i * 2 * Math.PI / nofCleavageValues + factor * Math.PI / nofCleavageValues)

        smartspiderElement.append('path')
          .attr('id', 'path' + i + 'inner')
          .attr('d', arc)

        smartspiderElement.append('text')
          .style('font-size', '10px')
          .style('font-weight', 'bold')
          .attr('font-family', 'sans-serif')
          .attr('text-anchor', 'middle')
          .append('textPath')
          .attr('xlink:href', window.location.href + '#path' + i + 'inner')
          .attr('startOffset', '25%')
          .text(innerText)
      } else { // one line
        arc = d3Shape.arc()
          .innerRadius(205 + factor * 5 + translation)
          .outerRadius(205 + factor * 5 + translation)
          .startAngle(i * 2 * Math.PI / nofCleavageValues - factor * Math.PI / nofCleavageValues)
          .endAngle(i * 2 * Math.PI / nofCleavageValues + factor * Math.PI / nofCleavageValues)

        smartspiderElement.append('path')
          .attr('id', 'path' + i)
          .attr('d', arc)

        smartspiderElement.append('text')
          .style('font-size', '10px')
          .style('font-weight', 'bold')
          .attr('font-family', 'sans-serif')
          .attr('text-anchor', 'middle')
          .append('textPath')
          .attr('xlink:href', '#path' + i)
          .attr('startOffset', '25%')
          .text(smartspider.smartspider[i].name)
      }
    }
  }

  drawCircularScale (smartspiderElement, candidateSmartspider)  {
    // draw white background
    smartspiderElement.append('rect')
      .attr('fill', 'white')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('transform', 'translate(-' + width / 2 + ' ,-' + height / 2 + ')')

    // draw copyright
    smartspiderElement.append('text')
      .attr('class', 'smartspider-copyright')
      .style('font-size', '10px')
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'end')
      .attr('x', width / 2)
      .attr('y', height / 2 - 10)
      .text('© www.smartvote.ch / www.sotomo.ch')

    // draw concentric scale circles
    for (let i = 1; i < 21; i++) {
      let strokeWidth = 1
      let color = '#D9D9D9'
      if (i % 5 === 0) {
        strokeWidth = 2
        color = '#8F8F8F'
      }
      smartspiderElement.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 9 + 9 * i)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
    }
    // draw legend of concentric scale circles
    const nofCleavageValues = candidateSmartspider.smartspider.length
    const startAngle = Math.PI / 2
    const deltaAngle = -2 * Math.PI / nofCleavageValues
    const angle = 90 - 360 * (startAngle + 0.5 * deltaAngle) / (2 * Math.PI)
    for (let i = 25; i <= 100; i = i + 25) {
      const x = Math.cos(startAngle + 0.5 * deltaAngle) * r(i - 5)
      const y = -Math.sin(startAngle + 0.5 * deltaAngle) * r(i - 5)
      smartspiderElement.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .attr('fill', '#8f8f8f')
        .attr('transform', 'translate(' + x + ',' + y + ') rotate(' + angle + ')')
        .text(i)
    }
  }

  drawSmartspiderBackground (rootElement) {
    const chart = d3Select.select(rootElement).append('div')
    const svg = chart.append('svg')
      .attr('id', 'smartspider-main')

    svg.attr('viewBox', '0 0 ' + width + ' ' + height)

    const smartspider = svg.append('g')
      .attr('class', 'smartspider')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    smartspider.append('rect')
      .attr('fill', 'white')
      .attr('height', '100%')
      .attr('width', '100%')
  }
}
/* tslint:enable */
