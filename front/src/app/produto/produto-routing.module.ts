import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto.component';

const routes: Routes = [
  {
    path: 'lista',
    loadChildren: () => import('./produto-lista/produto-lista.module').then(module => module.ProdutoListaModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./produto-cadastro/produto-cadastro.module').then(module => module.ProdutoCadastroModule)
  },
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule {
  static components = [ ProdutoComponent ]
 }
