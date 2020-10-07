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
        name: 'D3.js',
        link: 'd3'
      },
      // {
      //   image: {
      //     src: 'https://i1.wp.com/slacker.ro/wp-content/uploads/2019/07/highcharts_logo.png?w=675&ssl=1',
      //     alt: 'HighCharts Logo'
      //   },
      //   name: 'High Charts',
      //   link: 'highcharts'
      // },
      // {
      //   image: {
      //     src: 'https://www.amcharts.com/wp-content/uploads/2017/10/amcharts_light_transparent-292x163.png',
      //     alt: 'AmCharts Logo'
      //   },
      //   name: 'AmCharts',
      //   link: 'amcharts'
      // },
      // {
      //   image: {
      //     src: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_efb1b2ba6b11bd2a070628dc56b9fef5/canvasjs-charts.png',
      //     alt: 'CanvasJS Logo'
      //   },
      //   name: 'CanvasJS',
      //   link: 'canvasjs'
      // },
      // {
      //   image: {
      //     src: 'https://steemitimages.com/p/3W72119s5BjWMGm4Xa2MvD5AT2bJsSA8F9WeC71v1s1fKfGkK9mMKuc3LcvF4KigbWg9UsrpEPZ2MNDNouFg6CowMcBnRU7r9VJGN1M7GZ1xH89AteMTvn?format=match&mode=fit&width=640',
      //     alt: 'ChartJS Logo'
      //   },
      //   name: 'ChartJS',
      //   link: 'chartjs'
      // }
    ]

    this._chartTypeDict = {
      d3: [
        { value: 'bar', viewValue: 'Bar Graph' },
        { value: 'bubble', viewValue: 'Bubble Graph' },
        { value: 'treemap', viewValue: 'TreeMap' }
      ],
      // highcharts: [
      //   { value: 'bar', viewValue: 'Bar Graph' },
      //   { value: 'bubble', viewValue: 'Bubble Graph' },
      //   { value: 'treemap', viewValue: 'TreeMap' }
      // ],
      // amcharts: [
      //   { value: 'bar', viewValue: 'Bar Graph' },
      //   { value: 'bubble', viewValue: 'Bubble Graph' },
      //   { value: 'treemap', viewValue: 'TreeMap' }
      // ],
      // canvasjs: [
      //   { value: 'bar', viewValue: 'Bar Graph' },
      //   { value: 'bubble', viewValue: 'Bubble Graph' },
      //   { value: 'treemap', viewValue: 'TreeMap' }
      // ],
      // chartjs: [
      //   { value: 'bar', viewValue: 'Bar Graph' },
      //   { value: 'bubble', viewValue: 'Bubble Graph' },
      //   { value: 'treemap', viewValue: 'TreeMap' }
      // ]
    }

    this._http.get<ChartData>('assets/data.json').subscribe(_ => {
      this._chartData$.next({ ..._ })
    })

  }

  setChartLibrary(): void {
    // setChartLibrary(_: ChartLibrary): void {
    // this._chartLibrary$.next({ ..._ })
    // this._chartTypeList$.next(this._chartTypeDict[_.link])
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
