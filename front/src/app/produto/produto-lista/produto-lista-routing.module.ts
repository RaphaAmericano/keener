import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoListaComponent } from './produto-lista.component'
const routes: Routes = [
  {
    path:'',
    component:ProdutoListaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoListaRoutingModule { 
  static components = [ ProdutoListaComponent]
}
