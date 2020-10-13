import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3ShellComponent } from './components/d3-shell/d3-shell.component'
import { D3ColorBarContainerComponent } from './components/d3-color-bar-container/d3-color-bar-container.component';

const routes: Routes = [
  {
    path: '',
    component: D3ShellComponent,
    children: [
      {
        path: 'color',
        component: D3ColorBarContainerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
