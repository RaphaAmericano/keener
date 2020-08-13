import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoListaRoutingModule } from './movimentacao-lista-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MovimentacaoListaRoutingModule.components],
  imports: [
    CommonModule,
    MovimentacaoListaRoutingModule,
    SharedModule
  ]
})
export class MovimentacaoListaModule { }
