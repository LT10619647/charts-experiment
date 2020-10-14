import { Component, Input, OnInit, Renderer2 } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as fromD3 from 'd3'

import { DivergeData, SunburstData } from 'src/app/services/home.service'

type _PHashMouseEvent = MouseEvent | any
type _PHashData = number | any

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

  // private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 20;
  private _width = 808 - (this._margin * 2);
  private _height = 296 - (this._margin * 2);

  constructor(
    private _renderer: Renderer2
  ) {
    // this._dataPoint$ = new BehaviorSubject<SunburstData>(null)
    this._dataPoint$ = new BehaviorSubject<DivergeData>(null)
  }

  ngOnInit(): void {
    this._dataPoint$.subscribe(_ => { if (!!_) this._divergeCanvas(_) })
    // this._dataPoint$.subscribe(_ => { if (!!_) this._divergeSVG(_) })
  }

  private _createSVG(_figure: fromD3.Selection<fromD3.BaseType, unknown, HTMLElement, any>): fromD3.Selection<SVGGElement, unknown, HTMLElement, any> {
    // if (!fromD3.select('figure#graph svg').empty()) fromD3.select('figure#graph svg').remove()

    const _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any> = fromD3.select('figure#graph')
      .append('svg')
      .attr('id', 'g-center-align')
      // .attr('width', this._width)
      .attr('width', this._width + (this._margin * 2))
      // .attr('height', this._height)
      .attr('height', this._height + (this._margin * 2))
      .append('g')
      .style('transform', `translate(${this._margin}px, ${this._margin}px)`)

    return _svg
  }

  private _divergeSVG(divergeData: DivergeData) {

    // https://bl.ocks.org/SevenChan07/3fbb45be891cc3fda3bf139e4853535b

    const _figure: fromD3.Selection<fromD3.BaseType, unknown, HTMLElement, any> = fromD3.select('figure#graph')
    const _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any> = this._createSVG(_figure)
    const _maxYMagnitude = Math.max(...divergeData.hammingDistances)
    const _dimensions: { width: number; height: number; margin: number } = { width: this._width, height: this._height, margin: this._margin }

    _svg.call(fromD3.zoom()
      .scaleExtent([1, divergeData.hammingDistances.length / divergeData.firstVideoFPS])
      .translateExtent([
        [0, 0],
        [_dimensions.width, _dimensions.height],
      ])
      .extent([
        [0, 0],
        [_dimensions.width, _dimensions.height],
      ])
      .on('zoom', zoom))

    _svg
      .append('rect')
      .attr('class', 'zoom-panel')
      .attr('width', _dimensions.width)
      .attr('height', _dimensions.height)

    const _defs = _svg.append('defs')

    _defs.append('clipPath')
      .attr('id', 'data-clip-path')
      .append('rect')
      .attr('width', _dimensions.width)
      .attr('height', _dimensions.height)

    const _tooltip = fromD3.select('figure#graph')
      .append('div')
      .attr('id', 'chart-tooltip')
      .style('position', 'fixed')
      .style('display', 'none')
      .style('justify-content', 'center')
      .style('background-color', '#616161e6')
      .style('color', '#fafafa')
      .style('border-radius', '4px')
      .style('padding', '4px 8px')
      .style('font-size', '12px')
      .style('box-shadow', '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)')

    const xBand = fromD3.scaleBand<number>()
      .domain(divergeData.hammingDistances.map((_, i) => i + 1))
      .range([0, _dimensions.width])

    const xScale = fromD3.scaleLinear()
      .range([0, _dimensions.width])
      .domain([1, divergeData.hammingDistances.length])

    const yScale = fromD3.scaleLinear<number>()
      .range([_dimensions.height, 0])
      .domain([0, _maxYMagnitude])

    const color = fromD3.scaleSequential(fromD3.interpolateRdYlGn)
      .domain([_maxYMagnitude, 0])

    const xAxis = _svg
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', `translate(0px, ${_dimensions.height}px)`)
      .style('transform', `translate(0px, ${_dimensions.height}px)`)
      .call(fromD3.axisBottom(xScale))

    let _counter: number = 0

    const _dataPoints = _svg
      .append('g')
      .attr('id', 'data-point-group')
      .attr('clip-path', 'url(#data-clip-path)')
      .selectAll('rect')
      .data(divergeData.hammingDistances)
      .join('rect')
      .style('fill', _ => color(_))
      .attr('x', (_, i) => xScale(i + 1))
      .attr('y', _ => yScale(_maxYMagnitude))
      .attr('width', xBand.bandwidth())
      .attr('height', _ => yScale(0) - yScale(_maxYMagnitude))
      .style('transform', _ => `translate(${(xBand.bandwidth()) * -1}px, 0px)`)
    // .on('mouseenter', ($, _: _PHashData) => {
    //   _tooltip.style('display', 'flex')
    //   _tooltip.html(`<p class="m-0">Hamming Distance: ${_}</p>`)
    // })
    // .on('mousemove', ($: _PHashMouseEvent) => {
    //   _tooltip
    //     .style('left', ($.clientX + 20) + 'px')
    //     .style('top', ($.clientY) + 20 + 'px')
    // })
    // .on('mouseleave', _ => { _tooltip.style('display', 'none') })

    function zoom($: fromD3.D3ZoomEvent<SVGRectElement, { hammingDistance: number; frameNumber: number }>) {
      xAxis.call(fromD3.axisBottom($.transform.rescaleX(xScale)))
      _dataPoints.style('transform', `translate(${$.transform.x}px, 0px) scale(${$.transform.k}, 1)`)
    }
  }

  private _divergeCanvas(divergeData: DivergeData) {

    const _figure: fromD3.Selection<fromD3.BaseType, unknown, HTMLElement, any> = fromD3.select('figure#graph')
    const _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any> = this._createSVG(_figure)
    const _maxYMagnitude = Math.max(...divergeData.hammingDistances)
    const _dimensions: { width: number; height: number; margin: number } = { width: this._width, height: this._height, margin: this._margin }

    const _canvas: fromD3.Selection<HTMLCanvasElement, unknown, HTMLElement, any> = fromD3.select('figure#graph')
      .append('canvas')
      .attr('width', `${_dimensions.width}px`)
      .attr('height', `${_dimensions.height}px`)
      .style('position', 'absolute')
      .style('top', `${_dimensions.margin}px`)
      .style('left', `${_dimensions.margin}px`)

    const _context: CanvasRenderingContext2D = _canvas.node().getContext('2d')
    const _templateBase: Element = this._renderer.createElement('diverge-data-holder')
    const _template: fromD3.Selection<Element, unknown, null, undefined> = fromD3.select(_templateBase)

    const _colorScale: fromD3.ScaleSequential<string> = fromD3.scaleSequential(fromD3.interpolateRdYlGn)
      .domain([_maxYMagnitude, 0])

    const xBand = fromD3.scaleBand<number>()
      .domain(divergeData.hammingDistances.map((_, i) => i + 1))
      .range([0, _dimensions.width])

    const xScale = fromD3.scaleLinear()
      .domain([0, divergeData.hammingDistances.length + 1])
      .range([0, _dimensions.width])

    const xAxis = _svg
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', `translate(0px, ${_dimensions.height}px)`)
      .call(fromD3.axisBottom(xScale))

    const yScale = fromD3.scaleLinear<number>()
      .range([_dimensions.height, 0])
      .domain([0, _maxYMagnitude])

    _figure.call(fromD3.zoom()
      .scaleExtent([1, divergeData.hammingDistances.length / divergeData.firstVideoFPS])
      .translateExtent([
        [0, 0],
        [_dimensions.width, _dimensions.height],
      ])
      .extent([
        [0, 0],
        [_dimensions.width, _dimensions.height],
      ])
      .on('zoom', zoom))

    function draw(): void {
      _context.clearRect(0, 0, _dimensions.width, _dimensions.height)

      const _dataPoints = _template.selectAll('diverge-data.data-point')

      _dataPoints.each((_, i, d) => {
        const _node: fromD3.Selection<any, unknown, null, undefined> = fromD3.select(d[i])

        _context.fillStyle = _node.attr('fillStyle')
        _context.strokeStyle = _node.attr('fillStyle')

        _context.fillRect(
          (+_node.attr('x')),
          (+_node.attr('y')),
          (+_node.attr('width')),
          (+_node.attr('height'))
        )

        /* Uncomment if haze is required to be removed */
        // _context.lineWidth = _dimensions.width / d.length
        // _context.strokeRect(
        //   (+_node.attr('x')),
        //   (+_node.attr('y')),
        //   (+_node.attr('width')),
        //   (+_node.attr('height'))
        // )
      })
    }

    function dataBind(divergeData: number[]) {
      _template.selectAll('diverge-data.data-point')
        .data(divergeData)
        .join('diverge-data')
        .attr('class', 'data-point')
        .attr('x', (_, i, d) => xScale(i + 1))
        .attr('y', _ => yScale(_maxYMagnitude))
        .attr('width', xBand.bandwidth())
        .attr('height', (_, i, d) => yScale(0) - yScale(_maxYMagnitude))
        .attr('fillStyle', _ => _colorScale(_))

      draw()
    }

    dataBind(divergeData.hammingDistances)

    function zoom($: fromD3.D3ZoomEvent<HTMLCanvasElement, { hammingDistance: number; frameNumber: number }>) {
      xAxis.call(fromD3.axisBottom($.transform.rescaleX(xScale)))

      _context.save()
      _context.clearRect(0, 0, _dimensions.width, _dimensions.height)
      _context.translate($.transform.x, 0)
      _context.scale($.transform.k, 1)
      draw()
      _context.restore()
    }

  }

}
