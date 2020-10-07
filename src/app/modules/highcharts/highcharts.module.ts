import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsRoutingModule } from './highcharts-routing.module';
import { HighchartsShellComponent } from './components/highcharts-shell/highcharts-shell.component';
import { HighchartsHomeContainerComponent } from './components/highcharts-home-container/highcharts-home-container.component';
import { HighchartsHomeComponent } from './components/highcharts-home-container/highcharts-home/highcharts-home.component';


@NgModule({
  declarations: [HighchartsShellComponent, HighchartsHomeContainerComponent, HighchartsHomeComponent],
  imports: [
    CommonModule,
    HighchartsRoutingModule
  ]
})
export class HighchartsModule { }
