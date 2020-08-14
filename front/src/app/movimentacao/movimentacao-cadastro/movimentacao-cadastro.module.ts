import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoCadastroRoutingModule } from './movimentacao-cadastro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MovimentacaoCadastroRoutingModule.components],
  imports: [
    CommonModule,
    MovimentacaoCadastroRoutingModule,
    SharedModule
  ]
})
export class MovimentacaoCadastroModule { }
