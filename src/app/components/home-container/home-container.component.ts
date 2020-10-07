import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ChartLibrary, HomeService } from 'src/app/services/home.service'

@Component({
  selector: 'app-home-container',
  template: `<app-home [libraries]        = "libraries$ | async"
                       (triggerNavigate$) = "triggerNavigate($event)"></app-home>`
})
export class HomeContainerComponent implements OnInit {

  libraries$: Observable<ChartLibrary[]>

  constructor(
    private _homeService: HomeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._homeService.fetchLibraries()
    this.libraries$ = this._homeService.watchLibraries()
  }

  triggerNavigate(_: ChartLibrary) {
    // this._homeService.setChartLibrary(_)
    this._router.navigate([_.link])
  }

}
