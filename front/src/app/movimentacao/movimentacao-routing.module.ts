import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacaoComponent } from './movimentacao.component';

const routes: Routes = [
  {
    path:'lista',
    loadChildren: () => import('./movimentacao-lista/movimentacao-lista.module').then(module => module.MovimentacaoListaModule)
  },
  {
    path:'cadastro',
    loadChildren: () => import('./movimentacao-cadastro/movimentacao-cadastro.module').then(module => module.MovimentacaoCadastroModule)
  },
  {
    path:'',
    redirectTo:'lista',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { 
  static componentes = [MovimentacaoComponent];
}
