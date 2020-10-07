import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-d3-shell',
  templateUrl: './d3-shell.component.html',
  styleUrls: ['./d3-shell.component.scss']
})
export class D3ShellComponent implements OnInit {

  private _chartLibrary$: Observable<ChartLibrary>
  chartLibrary: ChartLibrary

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this._homeService.setChartLibrary()
    this._chartLibrary$ = this._homeService.watchChartLibrary()
    this._chartLibrary$.subscribe(_ => { this.chartLibrary = { ..._ } })
  }

}
