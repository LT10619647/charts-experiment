import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as fromD3 from 'd3'

import { ChartData, ChartDataElement, ChartDataPoint, ChartLibrary, ChartType } from 'src/app/services/home.service'

@Component({
  selector: 'app-d3-home',
  templateUrl: './d3-home.component.html',
  styleUrls: ['./d3-home.component.scss']
})
export class D3HomeComponent implements OnInit {

  private _chartData$: BehaviorSubject<ChartData>
  private _chartType$: BehaviorSubject<ChartType>
  private _chartTypeList$: BehaviorSubject<ChartType[]>
  private _chartLibrary$: BehaviorSubject<ChartLibrary>

  @Input()
  set chartData(value: ChartData) { this._chartData$.next(value) }
  get chartData(): ChartData { return this._chartData$.getValue() }

  @Input()
  set chartType(value: ChartType) { this._chartType$.next(value) }
  get chartType(): ChartType { return this._chartType$.getValue() }

  @Input()
  set chartTypeList(value: ChartType[]) { this._chartTypeList$.next(value) }
  get chartTypeList(): ChartType[] { return this._chartTypeList$.getValue() }

  @Input()
  set chartLibrary(value: ChartLibrary) { this._chartLibrary$.next(value) }
  get chartLibrary(): ChartLibrary { return this._chartLibrary$.getValue() }

  @Output() triggerGraphChange$: EventEmitter<ChartType>

  private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 50;
  private _width = 768 - (this._margin * 2);
  private _height = 768 - (this._margin * 2);

  constructor() {
    this._chartData$ = new BehaviorSubject<ChartData>(null)
    this._chartType$ = new BehaviorSubject<ChartType>(null)
    this._chartTypeList$ = new BehaviorSubject<ChartType[]>([])
    this._chartLibrary$ = new BehaviorSubject<ChartLibrary>(null)

    this.triggerGraphChange$ = new EventEmitter<ChartType>()
  }

  ngOnInit(): void {
    this._chartData$.subscribe(_ => { if (!!_) this._bubble(_.data) })
  }

  private _createSVG(_?: { x: number, y: number, width: number, height: number }): void {
    if (!fromD3.select('figure#graph svg').empty()) fromD3.select('figure#graph svg').remove()

    this._svg = fromD3.select('figure#graph')
      .append('svg')
    if (!!_) this._svg.attr('viewBox', `${_.x} ${_.y} ${_.width} ${_.height}`)

    this._svg.attr('width', this._width + (this._margin * 2))
      .attr('height', this._height + (this._margin * 2))

  }

  private _bar(_: ChartDataElement[]): void {

    this._createSVG()

    // Create the X-axis band scale
    const xAxis: fromD3.ScaleBand<string> = fromD3.scaleBand()
      .range([0, this._width])
      // .domain(_.map(__ => __.Video1))
      .domain(_.map(__ => `Video - ${__.data.index}`))
      // .domain(_.map((__, i) => `Video ${i}`))
      .padding(0.2)

    // Draw the X-axis on the DOM
    this._svg.append('g')
      .attr('transform', 'translate(0,' + this._height + ')')
      .call(fromD3.axisBottom(xAxis))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')

    // Create the Y-axis band scale
    const yAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
      .domain([0, 100])
      .range([this._height, 0])

    // Draw the Y-axis on the DOM
    this._svg.append('g')
      .call(fromD3.axisLeft(yAxis))

    // Create and fill the bars
    this._svg.selectAll('bars')
      .data(_)
      .enter()
      .append('rect')
      .attr('x', __ => xAxis(`Video - ${__.data.index}`))
      // .attr('x', __ => xAxis(__.Video1))
      .attr('y', __ => yAxis(__['Similarity Percent']))
      .attr('width', xAxis.bandwidth())
      .attr('height', __ => this._height - yAxis(__['Similarity Percent']))
      .attr('fill', '#4285f4')
  }

  private _bubble(chartData: ChartDataElement): void {

    // https://observablehq.com/@d3/zoomable-circle-packing?collection=@d3/d3-hierarchy

    let focus: fromD3.HierarchyCircularNode<unknown>
    let view: { x: number, y: number, d: number }
    let dimensions: { width: number, height: number } = { width: this._width, height: this._height }

    // this._createSVG({
    //   x: dimensions.width / -2,
    //   y: dimensions.height / -2,
    //   width: dimensions.width,
    //   height: dimensions.height
    // })
    this._createSVG()

    // this._svg.on('click', (event) => zoom({ event: <MouseEvent>event, __: root, svgEl: this._svg }))

    const bubblePack = (_: ChartDataElement) => fromD3.pack()
      .size([dimensions.width, dimensions.height])
      .padding(5)
      (fromD3.hierarchy(_)
        // .sum(__ => (!!__.data) ? 5 - __.data['Mean Hamming Distance'] : 0))
        .sum(__ => (!!__.data) ? __.data.radius : 0))

    const root = bubblePack(chartData)

    const color = fromD3.scaleLinear<string, string>()
      // .domain([0, root.descendants().length])
      .domain([0, 5])
      .range(['#b3ebf2', '#1b5e20'])
      .interpolate(fromD3.interpolateRgb)


    const _tooltip = fromD3.select('figure#graph')
      .append('div')
      .attr('id', 'chart-tooltip')

    const node = this._svg.append('g')
      .attr('pointer-events', 'all')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', _ => `translate(${_.x},${_.y})`)
      .append('circle')
      .attr('r', _ => _.r)
      .attr('fill', _ => _.children ? color(_.depth) : 'white')
      // .on('click', (event, d) => focus !== <any>d && (zoom({ event: <any>event, __: <any>d, svgEl: this._svg }), (<any>event).stopPropagation()))
      .on('mouseenter', ($, _) => {
        _tooltip
          .style('position', 'absolute')
          .style('display', 'block')
          .style('background-color', '#4285f4')
          .style('color', '#fafafa')
          .style('border-radius', '5px')
          .style('padding', '8px')
          .style('width', '160px')

        if (!!_['data']['data']) {
          _tooltip.html(`<p style="text-align: center;">${_['data']['data']['Video1']}<br/>Mean Hamming Distance: ${_['data']['data']['Mean Hamming Distance']}</p>`)
        } else {
          _tooltip.html(`<p style="text-align: center; margin: 0px;">${_['data']['tag']}</p>`)
        }
      })
      .on('mousemove', _ => {
        _tooltip
          // .style('position', 'absolute')
          // .style('display', 'block')
          // .style('background-color', '#4285f4')
          // .style('color', '#fafafa')
          // .style('border-radius', '5px')
          // .style('padding', '8px')
          // .style('width', '160px')
          .style('left', (_['clientX'] + 70) + 'px')
          .style('top', (_['clientY']) + 'px')
        // .html(`<p style="text-align: center; margin: 0px; white-space: wrap;">${(!!_['data']['data']) ? _['data']['data']['Video1'] : _['data']['tag']}</p>`)
      })
      .on('mouseleave', _ => { _tooltip.style('display', 'none') })

  }

  private _treemap(_: ChartDataElement[]): void {
    this._createSVG()
  }

  changeGraph(_: ChartType) {
    this.triggerGraphChange$.emit(_)
  }
}
