import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'email',
    loadChildren: () => import('./formulario-email/formulario-email.module').then(module => module.FormularioEmailModule)
  },
  {
    path: 'nova',
    loadChildren: () => import('./formulario-nova/formulario-nova.module').then(module => module.FormularioNovaModule)
  },
  {
    path:'',
    redirectTo:'email'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperacaoSenhaRoutingModule { 
  static components = [ ]
}
