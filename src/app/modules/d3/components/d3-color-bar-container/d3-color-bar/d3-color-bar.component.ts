import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as fromD3 from 'd3'
import { HomeService, BarChartData } from 'src/app/services/home.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-d3-color-bar',
  templateUrl: './d3-color-bar.component.html',
  styleUrls: ['./d3-color-bar.component.scss']
})
export class D3ColorBarComponent implements OnInit {

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
    // console.log(_)
    const xTotal = this.hmsToSecondsOnly(_['total_duration']);
    const dateObj = new Date(xTotal * 1000);
    var hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    // Formatters for counts and times (converting numbers to Dates).
    var formatCount = fromD3.format(",.0f"),
      formatTime = fromD3.timeFormat("%Mm %Ss"),
      formatMinutes = function (d) {
        var hours = Math.floor(d / 3600),
          minutes = Math.floor((d - (hours * 3600)) / 60),
          seconds = d - (minutes * 60);
        var output = seconds + 's';
        if (minutes) {
          output = minutes + 'm ' + output;
        }
        if (hours) {
          output = hours + 'h ' + output;
        }
        return output;
      };
    var x = fromD3.scaleLinear()
      .domain([0, xTotal])
      .range([0, this._width]);

    this._svg.append('g')
      .attr('transform', 'translate(35,' + this._height + ')')
      .call(fromD3.axisBottom(x).tickFormat(formatMinutes))
      .selectAll('text')
      .attr('transform', 'rotate(0)')
      .style('text-anchor', 'end')


    var c = [];
    _['duration_of_color'].forEach(data => {
      var q = data.start
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

    var histogram = fromD3.histogram()
      .value(function (d) { return d; })   // I need to give the vector of value
      .domain([0, xTotal])  // then the domain of the graphic
      .thresholds(x.ticks(xTotal * 3)); // then the numbers of bins

    var bins = histogram(c);

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
      fromD3.select(this)
        .style("opacity", 1)
    }
    var mousemove = function (d, $) {
      var a, b;
      for (let x of _["duration_of_color"]) {
        if ($.x0 >= x.start && $.x0 <= x.end) {
          a = x.start.toFixed(2);
          b = x.end.toFixed(2);
          Tooltip
            .html("The Start Time is " + a + 's<br> The End time is ' + b + 's')
            .style('left', (d['clientX'] + 10) + 'px')
            .style('top', (d['clientY'] + 60) + 'px')
          // console.log(d['clientY'] + 60)
        }
      }
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
      fromD3.select(this)
        .style("stroke", "none")
    }

    this._svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 38)
      .attr("transform", function (d) { return "translate(" + x(d.x0) + ",358)"; })
      .attr("width", function (d) { return Math.abs(x(d.x1) - x(d.x0) + 1) })
      .attr("height", function (d) { if (d.length > 2) return 310 })
      .style("fill", "#69b3a2")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
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

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(this.barChartData)
  // }

}
