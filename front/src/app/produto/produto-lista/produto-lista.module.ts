import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { ProdutoListaRoutingModule } from './produto-lista-routing.module';


@NgModule({
  declarations: [ProdutoListaRoutingModule.components],
  imports: [
    CommonModule,
    ProdutoListaRoutingModule,
    SharedModule
  ]
})
export class ProdutoListaModule { }
