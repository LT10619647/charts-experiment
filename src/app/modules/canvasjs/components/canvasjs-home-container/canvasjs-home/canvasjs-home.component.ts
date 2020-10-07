import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ChartData, ChartLibrary, ChartType } from 'src/app/services/home.service'

@Component({
  selector: 'app-canvasjs-home',
  templateUrl: './canvasjs-home.component.html',
  styleUrls: ['./canvasjs-home.component.scss']
})
export class CanvasjsHomeComponent implements OnInit {

  private _data$: BehaviorSubject<ChartData>
  private _chartType$: BehaviorSubject<ChartType>
  private _chartTypeList$: BehaviorSubject<ChartType[]>
  private _chartLibrary$: BehaviorSubject<ChartLibrary>

  @Input()
  set data(value: ChartData) { this._data$.next(value) }
  get data(): ChartData { return this._data$.getValue() }

  @Input()
  set chartType(value: ChartType) { this._chartType$.next(value) }
  get chartType(): ChartType { return this._chartType$.getValue() }

  @Input()
  set chartTypeList(value: ChartType[]) { this._chartTypeList$.next(value) }
  get chartTypeList(): ChartType[] { return this._chartTypeList$.getValue() }

  @Input()
  set chartLibrary(value: ChartLibrary) { this._chartLibrary$.next(value) }
  get chartLibrary(): ChartLibrary { return this._chartLibrary$.getValue() }

  @Output() triggerGraphChange$: EventEmitter<ChartType>

  constructor() {
    this._data$ = new BehaviorSubject<ChartData>(null)
    this._chartType$ = new BehaviorSubject<ChartType>(null)
    this._chartTypeList$ = new BehaviorSubject<ChartType[]>([])
    this._chartLibrary$ = new BehaviorSubject<ChartLibrary>(null)

    this.triggerGraphChange$ = new EventEmitter<ChartType>()
  }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.chartType)
    console.log(this.chartTypeList)
    console.log(this.chartLibrary)
  }

  changeGraph(_: ChartType) {
    this.triggerGraphChange$.emit(_)
  }
}
