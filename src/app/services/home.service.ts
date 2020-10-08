import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export type ChartLibrary = {
  image: {
    src: string
    alt: string
  }
  name: string
  link: string
}

export type ChartDataPoint = {
  index: number
  Video1: string
  Video2: string
  'Similarity Percent': number
  'Hamming Distance Values': number[]
  'Time Codes': string[][]
  'Mean Hamming Distance': number
  Inference: string
  radius: number
  Duration: string
}

export type ChartDataElement = {
  tag: string
  data: ChartDataPoint | null
  children: ChartDataPoint[]
}

export type ChartData = {
  schema: {
    fields: {
      name: string
      type: string
    }[]
    primaryKey: string[]
    pandas_version: string
  }
  data: ChartDataElement
}

export type ChartType = {
  value: string
  viewValue: string
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _chartLibraries: ChartLibrary[]
  private _chartLibraries$: BehaviorSubject<ChartLibrary[]>

  private _chartLibrary$: BehaviorSubject<ChartLibrary>

  private _chartData$: BehaviorSubject<ChartData>

  private _chartTypeList$: BehaviorSubject<ChartType[]>

  private _chartType$: BehaviorSubject<ChartType>

  private _chartTypeDict: {
    [key: string]: ChartType[]
  }

  constructor(
    private _http: HttpClient
  ) {

    this._chartLibraries$ = new BehaviorSubject<ChartLibrary[]>([])
    this._chartLibrary$ = new BehaviorSubject<ChartLibrary>(null)

    this._chartData$ = new BehaviorSubject<ChartData>(null)
    this._chartTypeList$ = new BehaviorSubject<ChartType[]>([])
    this._chartType$ = new BehaviorSubject<ChartType>(null)

    this._chartLibraries = [
      {
        image: {
          src: 'https://raw.githubusercontent.com/d3/d3-logo/master/d3.svg',
          alt: 'D3.js Logo'
        },
        name: 'Data Visualization using D3.js',
        link: 'd3'
      }
    ]

    this._chartTypeDict = {
      d3: [
        { value: 'bar', viewValue: 'Bar Graph' },
        { value: 'bubble', viewValue: 'Bubble Graph' },
        { value: 'treemap', viewValue: 'TreeMap' }
      ]
    }

    this._http.get<ChartData>('assets/data.json').subscribe(_ => {
      this._chartData$.next({ ..._ })
    })

  }

  setChartLibrary(): void {
    this._chartLibrary$.next(this._chartLibraries[0])
    this._chartTypeList$.next(this._chartTypeDict['d3'])
  }

  watchChartLibrary(): Observable<ChartLibrary> {
    return this._chartLibrary$.asObservable()
  }

  fetchLibraries(): void {
    this._chartLibraries$.next(this._chartLibraries)
  }

  watchLibraries(): Observable<ChartLibrary[]> {
    return this._chartLibraries$.asObservable()
  }

  watchChartData(): Observable<ChartData> {
    return this._chartData$.asObservable()
  }

  watchChartTypeList(): Observable<ChartType[]> {
    return this._chartTypeList$.asObservable()
  }

  setChartType(_: ChartType): void {
    this._chartType$.next({ ..._ })
  }

  watchChartType(): Observable<ChartType> {
    return this._chartType$.asObservable()
  }

}
