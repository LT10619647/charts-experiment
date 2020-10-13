import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-chartjs-shell',
  templateUrl: './chartjs-shell.component.html',
  styleUrls: ['./chartjs-shell.component.scss']
})
export class ChartjsShellComponent implements OnInit {

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