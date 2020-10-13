import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { D3PhashOverviewContainerComponent } from './components/d3-phash-overview-container/d3-phash-overview-container.component'
import { D3PhashResultContainerComponent } from './components/d3-phash-result-container/d3-phash-result-container.component'
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
      },
      {
        path: 'phash',
        children: [
          {
            path: '',
            component: D3PhashOverviewContainerComponent,
          },
          {
            path: ':comparison',
            component: D3PhashResultContainerComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
