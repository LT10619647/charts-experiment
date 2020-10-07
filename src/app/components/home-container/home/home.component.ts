import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ChartLibrary } from 'src/app/services/home.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _libraries$: BehaviorSubject<ChartLibrary[]>

  @Input()
  set libraries(value: ChartLibrary[]) { this._libraries$.next(value) }
  get libraries(): ChartLibrary[] { return this._libraries$.getValue() }

  @Output() triggerNavigate$: EventEmitter<ChartLibrary>

  constructor() {
    this._libraries$ = new BehaviorSubject<ChartLibrary[]>([])

    this.triggerNavigate$ = new EventEmitter<ChartLibrary>()
  }

  ngOnInit(): void {

  }

  triggerNavigate(_: ChartLibrary) {
    this.triggerNavigate$.emit(_)
  }

}
