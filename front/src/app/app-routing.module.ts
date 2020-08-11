import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(module => module.CadastroModule)
  },
  {
    path:'',
    redirectTo:'cadastro',
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
