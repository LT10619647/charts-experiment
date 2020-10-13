import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as fromD3 from 'd3'

import { DivergeData, SunburstData } from 'src/app/services/home.service'

@Component({
  selector: 'app-de-phash-result',
  templateUrl: './de-phash-result.component.html',
  styleUrls: ['./de-phash-result.component.scss']
})
export class DePhashResultComponent implements OnInit {

  // private _dataPoint$: BehaviorSubject<SunburstData>
  private _dataPoint$: BehaviorSubject<DivergeData>

  // @Input()
  // set dataPoint(value: SunburstData) { this._dataPoint$.next(value) }
  // get dataPoint(): SunburstData { return this._dataPoint$.getValue() }
  @Input()
  set dataPoint(value: DivergeData) { this._dataPoint$.next(value) }
  get dataPoint(): DivergeData { return this._dataPoint$.getValue() }

  private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 50;
  private _width = 768 - (this._margin * 2);
  private _height = 768 - (this._margin * 2);

  constructor() {
    // this._dataPoint$ = new BehaviorSubject<SunburstData>(null)
    this._dataPoint$ = new BehaviorSubject<DivergeData>(null)
  }

  ngOnInit(): void {
    this._dataPoint$.subscribe(_ => { if (!!_) this._diverge(_) })
  }

  private _createSVG(): void {
    if (!fromD3.select('figure#graph svg').empty()) fromD3.select('figure#graph svg').remove()

    this._svg = fromD3.select('figure#graph')
      .append('svg')

    this._svg.attr('width', this._width + (this._margin * 2))
      .attr('height', (this._height + (this._margin * 2)) / 5)
  }

  private _sunburst(_: SunburstData): void {
    this._createSVG()
  }

  private _diverge(_: DivergeData) {

    // _.data = [
    //   { hammingDistance: 0, frameNumber: 1 },
    //   { hammingDistance: 1, frameNumber: 2 },
    //   { hammingDistance: 5, frameNumber: 3 },
    //   { hammingDistance: 3, frameNumber: 4 },
    //   { hammingDistance: 2, frameNumber: 5 },
    //   { hammingDistance: 0, frameNumber: 6 },
    //   { hammingDistance: 1, frameNumber: 7 },
    // ]

    this._createSVG()

    const _temp: number[] = _.data.reduce((_a: number[], _) => { _a.push(_.hammingDistance); return _a }, [])
    const _maxYMagnitude = Math.max(..._temp)

    const _dimensions: { width: number; height: number; margin: number } = { width: this._width, height: this._height, margin: this._margin }

    const xScale = fromD3.scaleBand<number>()
      .domain(_.data.map(__ => __.frameNumber))
      .range([this._margin, (this._width - this._margin)])
    // .padding(0.5)

    // const xScale = fromD3.scaleLinear<number>()
    //   .domain(_.data.map(__ => __.frameNumber))
    //   .range([this._margin, (this._width - this._margin)])
    // // .padding(0.5)

    const xAxis = g => g
      .style('transform', `translate(0px, ${(this._height - this._margin) / 5}px)`)
      .call(fromD3.axisBottom(xScale))

    const yScale = fromD3.scaleLinear<number>()
      .domain([0, fromD3.max(_.data, __ => __.hammingDistance)])
      .range([(this._height - this._margin) / 5, this._margin])

    const yAxis = g => g
      .style('transform', `translate(${this._margin}px, 0px)`)
      .call(fromD3.axisLeft(yScale).ticks(_maxYMagnitude))

    const color = fromD3.scaleSequential(fromD3.interpolateRdYlGn)
      .domain([_maxYMagnitude, 0])

    this._svg.append('g')
      .attr('id', 'x-axis')
      .style('transform', `translate(0px, ${this._height}px)`)
    // .call(xAxis)

    this._svg.append('g')
      .attr('id', 'y-axis')
    // .call(yAxis)

    this._svg.call(zoom)
      .append('g')
      .attr('id', 'data-point-group')
      .selectAll('rect')
      .data(_.data)
      .join('rect')
      .style('fill', _ => color(_.hammingDistance))
      .attr('x', _ => xScale(_.frameNumber))
      // .attr('y', _ => yScale(_.hammingDistance))
      .attr('y', _ => yScale(_maxYMagnitude))
      .attr('width', xScale.bandwidth())
      // .attr('width', _ => xScale(_.frameNumber))
      // .attr('height', _ => yScale(0) - yScale(_.hammingDistance))
      .attr('height', _ => yScale(0) - yScale(_maxYMagnitude))

    function zoom(svgEl: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      const extent = [[_dimensions.margin, _dimensions.margin], [_dimensions.width - _dimensions.margin, _dimensions.height - _dimensions.margin]]

      svgEl.call(fromD3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(<[[number, number], [number, number]]>extent)
        .extent(<[[number, number], [number, number]]>extent)
        .on('zoom', ($, _) => { }))

      // function zoomed(event) {
      //   xScale.range([_dimensions.margin, _dimensions.width - _dimensions.margin].map(d => event.transform.applyX(d)))
      //   svgEl.selectAll('.bars rect').attr('x', d => x(d.name)).attr('width', x.bandwidth())
      //   svgEl.selectAll('.x-axis').call(xAxis)
      // }
    }

  }

}
