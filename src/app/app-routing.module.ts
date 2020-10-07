import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeContainerComponent } from './components/home-container/home-container.component'

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeContainerComponent,
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./modules/d3/d3.module').then(_ => _.D3Module)
  },
  // {
  //   path: 'highcharts',
  //   loadChildren: () => import('./modules/highcharts/highcharts.module').then(_ => _.HighchartsModule)
  // },
  // {
  //   path: 'amcharts',
  //   loadChildren: () => import('./modules/amcharts/amcharts.module').then(_ => _.AmchartsModule)
  // },
  // {
  //   path: 'canvasjs',
  //   loadChildren: () => import('./modules/canvasjs/canvasjs.module').then(_ => _.CanvasjsModule)
  // },
  // {
  //   path: 'chartjs',
  //   loadChildren: () => import('./modules/chartjs/chartjs.module').then(_ => _.ChartjsModule)
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
