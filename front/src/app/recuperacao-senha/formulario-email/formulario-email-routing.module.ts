import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioEmailComponent } from './formulario-email.component';
const routes: Routes = [
  {
    path: '',
    component: FormularioEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioEmailRoutingModule { 
  static components = [ FormularioEmailComponent]
}
