import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChartjsRoutingModule } from './chartjs-routing.module'
import { ChartjsShellComponent } from './components/chartjs-shell/chartjs-shell.component'
import { ChartjsHomeContainerComponent } from './components/chartjs-home-container/chartjs-home-container.component'
import { ChartjsHomeComponent } from './components/chartjs-home-container/chartjs-home/chartjs-home.component'


@NgModule({
  declarations: [ChartjsShellComponent, ChartjsHomeContainerComponent, ChartjsHomeComponent],
  imports: [
    CommonModule,
    ChartjsRoutingModule
  ]
})
export class ChartjsModule { }
