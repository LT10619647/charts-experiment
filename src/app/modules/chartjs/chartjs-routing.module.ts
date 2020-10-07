import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ChartjsShellComponent } from './components/chartjs-shell/chartjs-shell.component'

const routes: Routes = [
  {
    path: '',
    component: ChartjsShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartjsRoutingModule { }
