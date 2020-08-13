import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoCadastroComponent } from './produto-cadastro.component';
const routes: Routes = [
  {
    path:'',
    component:ProdutoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoCadastroRoutingModule {
  static components = [ProdutoCadastroComponent]
 }
