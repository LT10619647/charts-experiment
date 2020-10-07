import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3RoutingModule } from './d3-routing.module';
import { D3ShellComponent } from './components/d3-shell/d3-shell.component';
import { D3HomeContainerComponent } from './components/d3-home-container/d3-home-container.component';
import { D3HomeComponent } from './components/d3-home-container/d3-home/d3-home.component';


@NgModule({
  declarations: [D3ShellComponent, D3HomeContainerComponent, D3HomeComponent],
  imports: [
    CommonModule,
    D3RoutingModule
  ]
})
export class D3Module { }
