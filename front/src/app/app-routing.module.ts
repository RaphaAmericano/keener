import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path:'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(module => module.CadastroModule)
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
