import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoListaRoutingModule } from './movimentacao-lista-routing.module';


@NgModule({
  declarations: [MovimentacaoListaRoutingModule.components],
  imports: [
    CommonModule,
    MovimentacaoListaRoutingModule
  ]
})
export class MovimentacaoListaModule { }
