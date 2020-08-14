import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacaoCadastroComponent } from './movimentacao-cadastro.component';

const routes: Routes = [
  {
    path:'',
    component:MovimentacaoCadastroComponent
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
export class MovimentacaoCadastroRoutingModule { 
  static components = [MovimentacaoCadastroComponent]
}
