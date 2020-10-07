import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3ShellComponent } from './components/d3-shell/d3-shell.component'

const routes: Routes = [
  {
    path: '',
    component: D3ShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
