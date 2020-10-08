import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as fromD3 from 'd3'

import { ChartData, ChartDataElement, ChartDataPoint, ChartLibrary, ChartType } from 'src/app/services/home.service'

@Component({
  selector: 'app-d3-phash-overview',
  templateUrl: './d3-phash-overview.component.html',
  styleUrls: ['./d3-phash-overview.component.scss']
})
export class D3PhashOverviewComponent implements OnInit {

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

  // @Output() triggerGraphChange$: EventEmitter<ChartType>

  private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 50;
  private _width = 768 - (this._margin * 2);
  private _height = 768 - (this._margin * 2);

  constructor() {
    this._chartData$ = new BehaviorSubject<ChartData>(null)
    this._chartType$ = new BehaviorSubject<ChartType>(null)
    this._chartTypeList$ = new BehaviorSubject<ChartType[]>([])
    this._chartLibrary$ = new BehaviorSubject<ChartLibrary>(null)

    // this.triggerGraphChange$ = new EventEmitter<ChartType>()
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

  // private _bar(_: ChartDataElement[]): void {

  //   this._createSVG()

  //   // Create the X-axis band scale
  //   const xAxis: fromD3.ScaleBand<string> = fromD3.scaleBand()
  //     .range([0, this._width])
  //     // .domain(_.map(__ => __.Video1))
  //     .domain(_.map(__ => `Video - ${__.data.index}`))
  //     // .domain(_.map((__, i) => `Video ${i}`))
  //     .padding(0.2)

  //   // Draw the X-axis on the DOM
  //   this._svg.append('g')
  //     .attr('transform', 'translate(0,' + this._height + ')')
  //     .call(fromD3.axisBottom(xAxis))
  //     .selectAll('text')
  //     .attr('transform', 'rotate(-45)')
  //     .style('text-anchor', 'end')

  //   // Create the Y-axis band scale
  //   const yAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
  //     .domain([0, 100])
  //     .range([this._height, 0])

  //   // Draw the Y-axis on the DOM
  //   this._svg.append('g')
  //     .call(fromD3.axisLeft(yAxis))

  //   // Create and fill the bars
  //   this._svg.selectAll('bars')
  //     .data(_)
  //     .enter()
  //     .append('rect')
  //     .attr('x', __ => xAxis(`Video - ${__.data.index}`))
  //     // .attr('x', __ => xAxis(__.Video1))
  //     .attr('y', __ => yAxis(__['Similarity Percent']))
  //     .attr('width', xAxis.bandwidth())
  //     .attr('height', __ => this._height - yAxis(__['Similarity Percent']))
  //     .attr('fill', '#4285f4')
  // }

  private _bubble(chartData: ChartDataElement): void {

    // https://observablehq.com/@d3/zoomable-circle-packing?collection=@d3/d3-hierarchy

    let focus: fromD3.HierarchyCircularNode<unknown>
    let view: { x: number, y: number, d: number }
    const _dimensions: { width: number, height: number } = { width: this._width, height: this._height }

    this._createSVG({
      x: _dimensions.width / -2,
      y: _dimensions.height / -2,
      width: _dimensions.width,
      height: _dimensions.height
    })
    // this._createSVG()

    this._svg.on('click', (event) => zoom({ event: <MouseEvent>event, __: root, svgEl: this._svg }))

    const bubblePack = (_: ChartDataElement) => fromD3.pack()
      .size([_dimensions.width, _dimensions.height])
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

    const _nodeGroup = this._svg.append('g')
      .attr('pointer-events', 'all')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', _ => `translate(${_.x},${_.y})`)
      .on('click', ($, _) => focus !== <MouseEvent | any>_ && (zoom({ event: <MouseEvent | any>$, __: <fromD3.HierarchyCircularNode<unknown> | any>_, svgEl: this._svg }), (<MouseEvent | any>$).stopPropagation()))

    const _nodeCircle = _nodeGroup.append('circle')
      .attr('r', _ => _.r)
      .attr('fill', _ => _.children ? color(_.depth) : 'white')
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
          _tooltip.html(`<p style='text-align: center;'>${_['data']['data']['Video1']}<br/>Mean Hamming Distance: ${_['data']['data']['Mean Hamming Distance']}</p>`)
        } else {
          _tooltip.html(`<p style='text-align: center; margin: 0px;'>${_['data']['tag']}</p>`)
        }
      })
      .on('mousemove', ($: MouseEvent | any) => {
        _tooltip
          .style('left', ($.clientX + 20) + 'px')
          .style('top', ($.clientY) + 20 + 'px')
      })
      .on('mouseleave', _ => { _tooltip.style('display', 'none') })

    // const label = _nodeGroup.append('text')
    //   .style('font-size', '10px')
    //   .style('z-index', '1')
    //   // .style('fill-opacity', d => d.parent === root ? 1 : 0)
    //   .style('pointer-events', 'none')
    //   .style('text-anchor', 'middle')
    //   .style('display', _ => _.parent === root ? 'inline' : 'none')
    //   .text(_ => (!!_['data']['data']) ? _['data']['data']['Video1'] : _['data']['tag'])

    // const label = this._svg.append('g')
    //   .style('font-size', '12px')
    //   .style('pointer-events', 'none')
    //   .style('text-anchor', 'middle')
    //   .selectAll('text')
    //   .data(root.descendants())
    //   .join('text')
    //   .style('fill-opacity', _ => _.parent === root ? 1 : 0)
    //   .style('display', _ => _.parent === root ? 'block' : 'none')
    //   .text(_ => (!!_['data']['data']) ? _['data']['data']['Video1'] : _['data']['tag'])

    zoomTo([root.x, root.y, root.r * 2])

    function zoomTo(v: [number, number, number] = [0, 0, 0]) {
      view = { x: v[0], y: v[1], d: v[2] }
      const zoomFactor: number = _dimensions.width / view.d

      _nodeGroup.style('transform', _ => `translate(${(_.x - view.x) * zoomFactor}px,${(_.y - view.y) * zoomFactor}px)`)
      _nodeCircle.attr('r', _ => _.r * zoomFactor)
    }

    function zoom(_: { event: MouseEvent, __: fromD3.HierarchyCircularNode<unknown>, svgEl: fromD3.Selection<SVGGElement, unknown, HTMLElement, any> }) {
      const _focus = { ...focus }
      focus = { ..._.__ }

      const transition: fromD3.Transition<SVGGElement, unknown, HTMLElement, any> = _.svgEl.transition()
        .duration(_.event.altKey ? 2500 : 750)
        .tween('zoom', d => {
          const i = fromD3.interpolateZoom([view.x, view.y, view.d], [focus.x, focus.y, focus.r * 2])
          return t => zoomTo(i(t))
        })

      // label
      //   .filter(_ => _.parent === focus)
      //   .transition(transition)
      //   .style('fill-opacity', d => d.parent === focus ? 1 : 0)
      //   .on('start', _ => {
      //     if (_.parent === focus) {
      //       _nodeGroup.style('display', 'none')
      //     } else {
      //       _nodeGroup.style('display', 'inline')
      //       // 'none'
      //     }
      //   })
      //   .on('end', _ => {
      //     if (_.parent !== focus) {
      //       // 'none'
      //       _nodeGroup.style('display', 'inline')
      //     } else {
      //       // 'inline'
      //       _nodeGroup.style('display', 'none')
      //     }
      //   })
    }
  }

  // private _treemap(_: ChartDataElement[]): void {
  //   this._createSVG()
  // }

  // changeGraph(_: ChartType) {
  //   this.triggerGraphChange$.emit(_)
  // }
}
