import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacaoListaComponent } from './movimentacao-lista.component';

const routes: Routes = [
  {
    path:'',
    component:MovimentacaoListaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoListaRoutingModule { 
  static components = [MovimentacaoListaComponent]
}
