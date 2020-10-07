import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CanvasjsShellComponent } from './components/canvasjs-shell/canvasjs-shell.component'

const routes: Routes = [
  {
    path: '',
    component: CanvasjsShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasjsRoutingModule { }
