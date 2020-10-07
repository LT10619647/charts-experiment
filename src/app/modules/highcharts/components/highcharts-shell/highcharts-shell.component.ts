import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-highcharts-shell',
  templateUrl: './highcharts-shell.component.html',
  styleUrls: ['./highcharts-shell.component.scss']
})
export class HighchartsShellComponent implements OnInit {

  private _chartLibrary$: Observable<ChartLibrary>
  chartLibrary: ChartLibrary

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this._chartLibrary$ = this._homeService.watchChartLibrary()
    this._chartLibrary$.subscribe(_ => { this.chartLibrary = { ..._ } })
  }
}
