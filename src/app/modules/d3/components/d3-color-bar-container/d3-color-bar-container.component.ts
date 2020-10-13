import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-d3-color-bar-container',
  template: `<app-d3-color-bar    [barChartData] = "barChartData$  | async"> </app-d3-color-bar>`
})
export class D3ColorBarContainerComponent implements OnInit {

  barChartData$: Observable<any>

  constructor(
    private _homeService: HomeService) { }

  ngOnInit(): void {
    this.barChartData$ = this._homeService.watchBarChartData()
  }

}
