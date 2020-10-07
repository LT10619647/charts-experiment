import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasjsRoutingModule } from './canvasjs-routing.module';
import { CanvasjsShellComponent } from './components/canvasjs-shell/canvasjs-shell.component';
import { CanvasjsHomeContainerComponent } from './components/canvasjs-home-container/canvasjs-home-container.component';
import { CanvasjsHomeComponent } from './components/canvasjs-home-container/canvasjs-home/canvasjs-home.component';


@NgModule({
  declarations: [CanvasjsShellComponent, CanvasjsHomeContainerComponent, CanvasjsHomeComponent],
  imports: [
    CommonModule,
    CanvasjsRoutingModule
  ]
})
export class CanvasjsModule { }
