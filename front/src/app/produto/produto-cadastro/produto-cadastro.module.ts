import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoCadastroRoutingModule } from './produto-cadastro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProdutoCadastroRoutingModule.components],
  imports: [
    CommonModule,
    ProdutoCadastroRoutingModule,
    SharedModule
  ]
})
export class ProdutoCadastroModule { }
