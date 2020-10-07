import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartData, ChartType, ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-chartjs-home-container',
  template: `<app-chartjs-home [data]                = "data$          | async"
                               [chartType]           = "chartType$     | async"
                               [chartTypeList]       = "chartTypeList$ | async"
                               [chartLibrary]        = "chartLibrary$  | async"
                               (triggerGraphChange$) = "triggerGraphChange($event)"></app-chartjs-home>`
})
export class ChartjsHomeContainerComponent implements OnInit {

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
