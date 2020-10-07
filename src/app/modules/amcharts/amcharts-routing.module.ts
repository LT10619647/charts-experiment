import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AmchartsShellComponent } from './components/amcharts-shell/amcharts-shell.component'

const routes: Routes = [
  {
    path: '',
    component: AmchartsShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmchartsRoutingModule { }
