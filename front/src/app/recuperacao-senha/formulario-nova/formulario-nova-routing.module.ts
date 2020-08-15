import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioNovaComponent } from './formulario-nova.component';
import { SenhaResolverService } from 'src/app/core/services/senha-resolver.service';

const routes: Routes = [
  {
    path: ':token',
    component: FormularioNovaComponent,
    resolve: { resolveData: SenhaResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioNovaRoutingModule { 
  static components = [ FormularioNovaComponent ]
}
