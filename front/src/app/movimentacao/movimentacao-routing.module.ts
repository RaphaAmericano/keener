import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacaoComponent } from './movimentacao.component';

const routes: Routes = [
  {
    path:'/lista'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { 
  static componentes = [MovimentacaoComponent];
}
