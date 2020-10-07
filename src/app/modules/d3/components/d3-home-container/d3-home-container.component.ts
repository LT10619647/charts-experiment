import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartData, ChartLibrary, ChartType, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-d3-home-container',
  template: `<app-d3-home [chartData]                = "chartData$          | async"
                          [chartType]           = "chartType$     | async"
                          [chartTypeList]       = "chartTypeList$ | async"
                          [chartLibrary]        = "chartLibrary$  | async"
                          (triggerGraphChange$) = "triggerGraphChange($event)"></app-d3-home>`
})
export class D3HomeContainerComponent implements OnInit {

  chartData$: Observable<ChartData>
  chartType$: Observable<ChartType>
  chartTypeList$: Observable<ChartType[]>
  chartLibrary$: Observable<ChartLibrary>

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.chartData$ = this._homeService.watchChartData()
    this.chartTypeList$ = this._homeService.watchChartTypeList()
    this.chartLibrary$ = this._homeService.watchChartLibrary()
    this.chartType$ = this._homeService.watchChartType()
  }

  triggerGraphChange(_: ChartType) {
    // this._homeService.setChartType(_)
  }

}
