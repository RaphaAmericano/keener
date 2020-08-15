import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path:'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path:'cadastro',
    canActivate:[LoginGuard],
    loadChildren: () => import('./cadastro/cadastro.module').then(module => module.CadastroModule)
  },
  {
    path:'recuperacao',
    canActivate:[],
    loadChildren: () => import('./recuperacao-senha/recuperacao-senha.module').then(module => module.RecuperacaoSenhaModule)
  },
  {
    path:'produto',
    canActivate:[AuthGuard],
    loadChildren: () => import('./produto/produto.module').then(module => module.ProdutoModule)
  },
  {
    path: 'movimentacao',
    canActivate:[AuthGuard],
    loadChildren: () => import('./movimentacao/movimentacao.module').then(module => module.MovimentacaoModule)
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
