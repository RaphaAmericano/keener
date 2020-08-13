import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';


@NgModule({
  declarations: [ProdutoRoutingModule.components, ProdutoCadastroComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule
  ]
})
export class ProdutoModule { }
