import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperacaoSenhaRoutingModule } from './recuperacao-senha-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecuperacaoSenhaRoutingModule,
    SharedModule
  ]
})
export class RecuperacaoSenhaModule { }
