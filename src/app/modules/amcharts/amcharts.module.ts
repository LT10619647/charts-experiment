import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmchartsRoutingModule } from './amcharts-routing.module';
import { AmchartsShellComponent } from './components/amcharts-shell/amcharts-shell.component';
import { AmchartsHomeContainerComponent } from './components/amcharts-home-container/amcharts-home-container.component';
import { AmchartsHomeComponent } from './components/amcharts-home-container/amcharts-home/amcharts-home.component';


@NgModule({
  declarations: [AmchartsShellComponent, AmchartsHomeContainerComponent, AmchartsHomeComponent],
  imports: [
    CommonModule,
    AmchartsRoutingModule
  ]
})
export class AmchartsModule { }
