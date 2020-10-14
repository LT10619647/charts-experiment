import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SunburstData, HomeService, DivergeData } from 'src/app/services/home.service'

@Component({
  selector: 'app-d3-phash-result-container',
  template: `<app-de-phash-result [dataPoint] = "dataPoint$ | async"></app-de-phash-result>`
})
export class D3PhashResultContainerComponent implements OnInit {

  // dataPoint$: Observable<SunburstData>
  dataPoint$: Observable<DivergeData>

  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit(): void {
    this._homeService.fetchDataPoint({ index: 2 })
    this.dataPoint$ = this._homeService.watchDataPoint()
  }

}
