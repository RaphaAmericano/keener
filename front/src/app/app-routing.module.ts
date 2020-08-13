import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
const routes: Routes = [
  {
    path:'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path:'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(module => module.CadastroModule)
  },
  {
    path:'produto',
    canActivateChild:[AuthGuard],
    loadChildren: () => import('./produto/produto.module').then(module => module.ProdutoModule)
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
