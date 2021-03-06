import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { D3RoutingModule } from './d3-routing.module'
import { D3ShellComponent } from './components/d3-shell/d3-shell.component'
import { D3PhashOverviewContainerComponent } from './components/d3-phash-overview-container/d3-phash-overview-container.component'
import { D3PhashOverviewComponent } from './components/d3-phash-overview-container/d3-phash-overview/d3-phash-overview.component'
import { D3PhashResultContainerComponent } from './components/d3-phash-result-container/d3-phash-result-container.component'
import { DePhashResultComponent } from './components/d3-phash-result-container/de-phash-result/de-phash-result.component'
import { D3ColorBarContainerComponent } from './components/d3-color-bar-container/d3-color-bar-container.component'
import { D3ColorBarComponent } from './components/d3-color-bar-container/d3-color-bar/d3-color-bar.component'


@NgModule({
  declarations: [
    D3ShellComponent,
    D3PhashOverviewContainerComponent, D3PhashOverviewComponent,
    D3PhashResultContainerComponent, DePhashResultComponent,
    D3ColorBarContainerComponent, D3ColorBarComponent
  ],
  imports: [
    CommonModule,
    D3RoutingModule
  ]
})
export class D3Module { }
