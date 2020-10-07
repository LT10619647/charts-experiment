import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HighchartsShellComponent } from './components/highcharts-shell/highcharts-shell.component'

const routes: Routes = [
  {
    path: '',
    component: HighchartsShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighchartsRoutingModule { }
