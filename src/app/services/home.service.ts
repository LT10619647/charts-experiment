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
  'Time Codes': [string, string][]
  'Mean Hamming Distance': number
  Inference: string
  Radius: number
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

export type BarChartData = {
  fileName: string
  total_duration: number
  duration_of_color: {
    start: number
    end: number
  }[]
}

export type SunburstData = {
  index: number
  similarityPercentage: number
  firstVideo: string
  secondVideo: string
  duration: number
  inference: string
  radius?: number
  data: {
    timeCode: {
      start: string
      end: string
    }
    hammingDistance: number[]
  }[]
}

export type DivergeData = {
  index: number
  similarityPercentage: number
  firstVideo: string
  secondVideo: string
  duration: string
  // data: {
  //   hammingDistance: number
  //   frameNumber: number
  // }[]
  hammingDistances: number[]
  meanHammingDistance: number
  inference: string
  firstVideoFPS: number
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
  // private _chartDataPoint$: BehaviorSubject<SunburstData>
  private _chartDataPoint$: BehaviorSubject<DivergeData>

  private _barChartData$: BehaviorSubject<BarChartData>

  private _chartTypeDict: {
    [key: string]: ChartType[]
  }

  constructor(
    private _http: HttpClient
  ) {

    this._chartLibraries$ = new BehaviorSubject<ChartLibrary[]>([])
    this._chartLibrary$ = new BehaviorSubject<ChartLibrary>(null)
    this._barChartData$ = new BehaviorSubject<BarChartData>(null)
    this._chartData$ = new BehaviorSubject<ChartData>(null)
    this._chartTypeList$ = new BehaviorSubject<ChartType[]>([])
    this._chartType$ = new BehaviorSubject<ChartType>(null)
    // this._chartDataPoint$ = new BehaviorSubject<SunburstData>(null)
    this._chartDataPoint$ = new BehaviorSubject<DivergeData>(null)

    this._chartLibraries = [
      {
        image: {
          src: 'https://raw.githubusercontent.com/d3/d3-logo/master/d3.svg',
          alt: 'D3.js Logo'
        },
        name: 'Data Visualization',
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

    this._http.get<ChartData>('assets/phash/phash-minimal.json').subscribe(_ => {
      this._chartData$.next({ ..._ })
    })

    this._http.get<BarChartData>('assets/colorBar.json').subscribe(_ => {
      this._barChartData$.next({ ..._ })
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

  watchBarChartData(): Observable<BarChartData> {
    return this._barChartData$.asObservable()
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

  fetchDataPoint(_: { index: number }): void {
    // this._http.get<SunburstData>(`assets/phash/phash-comparison-${_.index}.json`).subscribe(_ => { this._chartDataPoint$.next(_) })
    this._http.get<DivergeData>(`assets/phash/phash-comparison-${_.index}.json`).subscribe(_ => { this._chartDataPoint$.next(_) })
  }

  // watchDataPoint(): Observable<SunburstData> {
  watchDataPoint(): Observable<DivergeData> {
    return this._chartDataPoint$.asObservable()
  }

}
