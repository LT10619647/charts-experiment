import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as fromD3 from 'd3'
import { HomeService, BarChartData } from 'src/app/services/home.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-d3-away',
  templateUrl: './d3-away.component.html',
  styleUrls: ['./d3-away.component.scss']
})
export class D3AwayComponent implements OnInit {

  private _barChartData$: BehaviorSubject<BarChartData[]>

  @Input()
  set barChartData(value: any) { this._barChartData$.next(value) }
  get barChartData(): any { return this._barChartData$.getValue() }


  private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 50;
  private _width = 768 - (this._margin * 2);
  private _bins = []
  private _height = 768 - (this._margin * 2);

  constructor(
    private _homeService: HomeService
  ) {
    this._barChartData$ = new BehaviorSubject<BarChartData[]>(null)
  }

  ngOnInit(): void {


  }

  firstDraft(_: BarChartData[]) {
    this._createSVG()
    console.log(_)
    const x = this.hmsToSecondsOnly(_['total_duration']);
    var c = [];
    console.log(x)
    _['duration_of_color'].forEach(data => {
      var q = data.start
      console.log(data.start)
      var e = true;
      while (e) {
        c.push(q)
        if (data.end >= q) {
          q += 0.1
        } else {
          e = false
        }
      }
    })

    // Create the X-axis band scale
    const xAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
      .rangeRound([0, this._width])
      .domain([0, x]);

    this._svg.append('g')
      .attr('transform', 'translate(35,' + this._height + ')')
      .call(fromD3.axisBottom(xAxis))
      .selectAll('text')
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'end')

    //Creat the Y-axis band scale
    const yAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
      .rangeRound([this._width, 0])
      .domain([0, 1])

    this._svg.append('g')
      .attr('transform', 'translate(35, 0)')
      .call(fromD3.axisLeft(yAxis).ticks(1))
      .selectAll('text')
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'end')

    const area = fromD3.area()
      .x((datum: any) => xAxis(fromD3.mean([datum.x1, datum.x2])))
      .y0(yAxis(0))
      .y1((datum: any) => yAxis(datum.length));

    const histogram = fromD3.histogram()
      .value((datum) => datum)
      .domain([0, x])
      .thresholds(xAxis.ticks(60));

    this._bins = [];
    [c].forEach((row) => {
      this._bins.push(histogram(row))
    });

    var Tooltip = fromD3.select("figure#graph")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
      console.log(this)
      fromD3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function (d, $) {
      console.log(d, $, _)
      Tooltip
        .html("The Start Time is: " + _['duration_of_color'][0]['start'] + '<br> The End time is : ' + _['duration_of_color'][0]['end'])
        .style('left', (_['clientX'] + 70) + 'px')
        .style('top', (_['clientY']) + 'px')
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
      fromD3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }



    const paths = []
    this._bins.forEach((row, index) => {
      paths.push(this._svg.append('path')
        .datum(row)
        .attr('transform', 'translate(35, 0)')
        .attr('fill', '#1f77b4')
        .attr("stroke-width", 1)
        .attr('width', 10)
        .attr('opacity', 0.5)
        .attr('d', (datum: any) => area(datum))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
      );
    });

  }

  triggerGraph(_: BarChartData[]) {
    this._createSVG()
    console.log(_)
    const x = this.hmsToSecondsOnly(_['total_duration']);
    var c = [];
    console.log(x)
    _['duration_of_color'].forEach(data => {
      var q = data.start
      console.log(data.start)
      var e = true;
      while (e) {
        c.push(q)
        if (data.end >= q) {
          q += 0.1
        } else {
          e = false
        }
      }
    })
    console.log(c)

    // Create the X-axis band scale
    const xAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
      .rangeRound([0, this._width])
      .domain([0, x]);

    this._svg.append('g')
      .attr('transform', 'translate(35,' + this._height + ')')
      .call(fromD3.axisBottom(xAxis))
      .selectAll('text')
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'end')



    // var bins = histogram(c);
    // console.log(bins)

    // Create the Y-axis band scale
    // const yAxis: fromD3.ScaleBand<string> = fromD3.scaleBand()
    //   .range([this._width, 0])
    //   .domain(["1"]);
    const yAxis: fromD3.ScaleLinear<number, number> = fromD3.scaleLinear()
      .rangeRound([this._width, 0])
      .domain([0, 1])
    // .ticks(1)

    // d3.scaleLinear()
    // .range([height, 0]);
    // yAxis.domain([0, 1]);   // d3.hist has to be called before the Y axis obviously
    // this._svg.append("g")
    //   .attr('transform', 'translate(35, 0)')
    //   .call(fromD3.axisLeft(yAxis));
    // .call(d3.axisLeft(this.y).ticks(60).tickSize(0).tickFormat(<any>''));

    this._svg.append('g')
      .attr('transform', 'translate(35, 0)')
      .call(fromD3.axisLeft(yAxis).ticks(1))
      .selectAll('text')
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'end')
    // .text('Color Bar');

    const area = fromD3.area()
      .x((datum: any) => xAxis(fromD3.mean([datum.x1, datum.x2])))
      .y0(yAxis(0))
      .y1((datum: any) => yAxis(datum.length));


    const histogram = fromD3.histogram()
      .value((datum) => datum)
      .domain([0, x])
      .thresholds(xAxis.ticks(60));





    this._bins = [];
    [c].forEach((row) => {
      this._bins.push(histogram(row))
    });

    var Tooltip = fromD3.select("figure#graph")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
      console.log(this)
      fromD3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function (d, $) {
      console.log(d, $, _)
      Tooltip
        .html("The Start Time is: " + _['duration_of_color'][0]['start'] + '<br> The End time is : ' + _['duration_of_color'][0]['end'])
        .style('left', (_['clientX'] + 70) + 'px')
        .style('top', (_['clientY']) + 'px')
      // .style("left", (fromD3.mouse(this)[0] + 70) + "px")
      // .style("top", (fromD3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
      fromD3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }



    const paths = []
    this._bins.forEach((row, index) => {
      paths.push(this._svg.append('path')
        .datum(row)
        .attr('transform', 'translate(35, 0)')
        .attr('fill', '#1f77b4')
        .attr("stroke-width", 1)
        .attr('width', 10)
        .attr('opacity', 0.5)
        .attr('d', (datum: any) => area(datum))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        //   ($, _) => {
        //   console.log(_, $)
        //   Tooltip
        //     .html("The Start Time of<br>this cell is: " + _['duration_of_color']['start'])
        //     // .attr('position', 'absolute')
        //     // .style('top', 'left')
        //     .style('top', '100px')

        // })
        .on("mouseleave", mouseleave)
      );
    });

    console.log(paths)

    // const _tooltip = fromD3.select('figure#graph')
    //   .append('div')
    //   .attr('id', 'chart-tooltip')

    // const node = this._svg.append('g')
    //   .attr('pointer-events', 'all')
    //   .selectAll('g')
    //   .data([c]).join('g').on('mouseenter', ($, _) => {
    //     _tooltip
    //       .style('position', 'absolute')
    //       .style('display', 'block')
    //       .style('background-color', '#4285f4')
    //       .style('color', '#fafafa')
    //       .style('border-radius', '5px')
    //       .style('padding', '8px')
    //       .style('width', '160px')
    //     if (!!_['data']['data']) {
    //       _tooltip.html(`<p style="text-align: center;">${_['data']['data']['Video1']}<br/>Mean Hamming Distance: ${_['data']['data']['Mean Hamming Distance']}</p>`)
    //     } else {
    //       _tooltip.html(`<p style="text-align: center; margin: 0px;">${_['data']['tag']}</p>`)
    //     }
    //   }).on('mousemove', _ => {
    //     _tooltip
    //       // .style('position', 'absolute')
    //       // .style('display', 'block')
    //       // .style('background-color', '#4285f4')
    //       // .style('color', '#fafafa')
    //       // .style('border-radius', '5px')
    //       // .style('padding', '8px')
    //       // .style('width', '160px')
    //       .style('left', (_['clientX'] + 70) + 'px')
    //       .style('top', (_['clientY']) + 'px')
    //     // .html(`<p style="text-align: center; margin: 0px; white-space: wrap;">${(!!_['data']['data']) ? _['data']['data']['Video1'] : _['data']['tag']}</p>`)
    //   })
    //   .on('mouseleave', _ => { _tooltip.style('display', 'none') })


    // this._svg.selectAll("rect")
    //   .data(this._bins)
    //   .enter()
    //   .append("rect")
    //   .attr("x", 1)
    //   .attr("transform", function (d) { return "translate(" + xAxis(d.x0) + "," + yAxis(d.length) + ")"; })
    //   .attr("width", function (d) { return xAxis(d.x1) - xAxis(d.x0) - 1; })
    //   .attr("height", function (d) { return 10 })
    //   .style("fill", "#69b3a2")

    // .append('text')
    // .attr('transform', 'rotate(-90)')
    // .attr('y', 6)
    // .attr('dy', '0.71em')
    // .attr('text-anchor', 'end')
    // .text('Frequency');


    // .scaleBand()
    //   .range([this._height, 0])
    //   .domain(["0", "1"])

    // Draw the Y-axis on the DOM
    // this._svg.append('g')
    //   .call(fromD3.axisLeft(yAxis))
    //   .selectAll('text')
    //   .attr('transform', 'rotate(0)')
    //   .style('text-anchor', 'end')

    // Create and fill the bars
    // this._svg.selectAll('bars')
    //   .data(this.barChartData.data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', __ => xAxis(`${__['fileName']}`))
    //   // .attr('x', __ => xAxis(__.Video1))
    //   .attr('y', __ => yAxis(100))
    //   .attr('width', xAxis.bandwidth())
    //   .attr('height', __ => this._height - yAxis(__['Similarity Percent']))
    //   .attr('fill', '#4285f4')
    // console.log(xAxis(_["duration_of_color"][0].start), yAxis.bandwidth());

    // this._svg.selectAll('.bar')
    //   .data(_)
    //   .enter().append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => xAxis(_["duration_of_color"][0].start) / 10)
    //   // d["duration_of_color"][0].start))
    //   .attr('y', d => yAxis("1"))
    //   .attr('width', 100)
    //   .attr('height', d => yAxis.bandwidth());
  }

  private processData(data) {

  }

  private hmsToSecondsOnly(str) {
    var p = str.split(':'),
      s = 0, m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  private _createSVG(_?: { x: number, y: number, width: number, height: number }): void {
    if (!fromD3.select('figure#graph svg').empty()) fromD3.select('figure#graph svg').remove()

    this._svg = fromD3.select('figure#graph')
      .append('svg')
    if (!!_) this._svg.attr('viewBox', `${_.x} ${_.y} ${_.width} ${_.height}`)

    this._svg.attr('width', this._width + (this._margin * 2))
      .attr('height', this._height + (this._margin * 2))

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.barChartData)
  }

}
