import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MovimentacaoRoutingModule.componentes],
  imports: [
    CommonModule,
    MovimentacaoRoutingModule,
    SharedModule
  ]
})
export class MovimentacaoModule { }
