import { Component, Input, OnInit, } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import {
  hierarchy,
  HierarchyCircularNode,
  interpolateRgb,
  interpolateZoom,
  pack,
  scaleLinear,
  select,
  Selection,
  Transition
} from 'd3'
import { ChartData, ChartDataElement, ChartLibrary, ChartType } from 'src/app/services/home.service'

type _PHashMouseEvent = MouseEvent | any
type _PHashHierarchy = HierarchyCircularNode<unknown> | any

type _PHashDimension = {
  x: number
  y: number
  width: number
  height: number
}

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

  private _svg: Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 20;
  private _width = 808 - (this._margin * 2);
  private _height = 808 - (this._margin * 2);

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

  private _createSVG(_?: _PHashDimension): void {
    if (!select('figure#graph svg').empty()) select('figure#graph svg').remove()

    this._svg = select('figure#graph')
      .append('svg')
    if (!!_) this._svg.attr('viewBox', `${_.x} ${_.y} ${_.width} ${_.height}`)

    this._svg.attr('width', this._width + (this._margin * 2))
      .attr('height', this._height + (this._margin * 2))

  }

  private _bubble(chartData: ChartDataElement): void {

    // https://observablehq.com/@d3/zoomable-circle-packing?collection=@d3/d3-hierarchy
    // https://fabiofranchino.com/blog/the-new-d3.js-join-method-is-awesome-for-t/

    let focus: HierarchyCircularNode<unknown>
    let view: { x: number, y: number, d: number }
    const _dimensions: { width: number, height: number } = { width: this._width, height: this._height }

    this._createSVG({
      x: _dimensions.width / -2,
      y: _dimensions.height / -2,
      width: _dimensions.width,
      height: _dimensions.height
    })

    this._svg.on('click', ($: _PHashMouseEvent) => zoom({ event: <_PHashMouseEvent>$, __: root, svgEl: this._svg }))

    const bubblePack = (_: ChartDataElement) => pack()
      .size([_dimensions.width, _dimensions.height])
      .padding(5)
      (hierarchy(_)
        .sum(__ => (!!__.data) ? __.data.Radius : 0))

    const root = bubblePack(chartData)

    const color = scaleLinear<string, string>()
      // .domain([0, root.descendants().length])
      .domain([0, 5])
      .range(['#b3ebf2', '#1b5e20'])
      .interpolate(interpolateRgb)


    const _tooltip = select('figure#graph')
      .append('div')
      .attr('id', 'chart-tooltip')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('justify-content', 'center')
      .style('background-color', '#616161e6')
      .style('color', '#fafafa')
      .style('border-radius', '4px')
      .style('padding', '4px 8px')
      .style('font-size', '12px')
      .style('box-shadow', '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)')
    // .style('width', '160px')

    const _nodeGroup = this._svg.append('g')
      .attr('pointer-events', 'all')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', _ => `translate(${_.x},${_.y})`)
      .on('click', ($, _) => focus !== <_PHashMouseEvent>_ && (zoom({ event: <_PHashMouseEvent>$, __: <_PHashHierarchy>_, svgEl: this._svg }), (<_PHashMouseEvent>$).stopPropagation()))

    const _nodeCircle = _nodeGroup.append('circle')
      .attr('r', _ => _.r)
      .attr('fill', _ => _.children ? color(_.depth) : 'white')
      .on('mouseenter', ($: _PHashMouseEvent, _: _PHashHierarchy) => {
        _tooltip.style('display', 'flex')
        let _htmlString: string = ''

        if (!!_['data']['data']) {
          _htmlString += `<p class="m-0 text-center">Mean Hamming Distance: ${(<ChartDataElement>(<HierarchyCircularNode<unknown>>_).data).data['Mean Hamming Distance']}</p>`
          _tooltip.html(_htmlString)
        } else {
          _htmlString += `<p class="m-0 text-center">Cluster: ${_['data']['tag']}</p>`
          _tooltip.html(_htmlString)
        }

      })
      .on('mousemove', ($: _PHashMouseEvent) => {
        _tooltip
          .style('left', ($.clientX + 20) + 'px')
          .style('top', ($.clientY) + 20 + 'px')
      })
      .on('mouseleave', _ => { _tooltip.style('display', 'none') })

    const label = _nodeGroup.append('text')
      .style('font-size', '10px')
      // .style('fill-opacity', d => d.parent === root ? 1 : 0)
      .style('pointer-events', 'none')
      .style('text-anchor', 'middle')
      // .style('display', _ => _.parent === root ? 'inline' : 'none')
      .text(_ => (!!_['data']['data']) ? _['data']['data']['Video1'] : _['data']['tag'])

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

    function zoom(_: { event: MouseEvent, __: HierarchyCircularNode<unknown>, svgEl: Selection<SVGGElement, unknown, HTMLElement, any> }) {
      focus = { ..._.__ }

      const transition: Transition<SVGGElement, unknown, HTMLElement, any> = _.svgEl.transition()
        .duration(_.event.altKey ? 2500 : 750)
        .tween('zoom', d => {
          const i = interpolateZoom([view.x, view.y, view.d], [focus.x, focus.y, focus.r * 2])
          return t => zoomTo(i(t))
        })

      label
        .filter(_ => _.parent === focus)
        .style('opacity', _ => {
          console.log(focus)
          console.log(_)
          return 1
        })
        .transition(transition)
        .style('fill-opacity', d => d.parent === focus ? 1 : 0)
        .on('start', _ => {
          if (_.parent === focus) {
            _nodeGroup.style('display', 'none')
          } else {
            _nodeGroup.style('display', 'inline')
            // 'none'
          }
        })
        .on('end', _ => {
          if (_.parent !== focus) {
            // 'none'
            _nodeGroup.style('display', 'inline')
          } else {
            // 'inline'
            _nodeGroup.style('display', 'none')
          }
        })
    }
  }
}
