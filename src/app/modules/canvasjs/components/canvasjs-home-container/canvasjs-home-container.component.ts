import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartData, ChartType, ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-canvasjs-home-container',
  template: `<app-canvasjs-home [data]                = "data$          | async"
                                [chartType]           = "chartType$     | async"
                                [chartTypeList]       = "chartTypeList$ | async"
                                [chartLibrary]        = "chartLibrary$  | async"
                                (triggerGraphChange$) = "triggerGraphChange($event)"></app-canvasjs-home>`
})
export class CanvasjsHomeContainerComponent implements OnInit {

  data$: Observable<ChartData>
  chartType$: Observable<string>
  chartTypeList$: Observable<ChartType[]>
  chartLibrary$: Observable<ChartLibrary>

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.data$ = this._homeService.watchChartData()
    this.chartTypeList$ = this._homeService.watchChartTypeList()
    this.chartLibrary$ = this._homeService.watchChartLibrary()
  }

  triggerGraphChange(_: ChartType) {
    console.log(_)
  }

}
