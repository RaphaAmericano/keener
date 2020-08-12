import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProdutoRoutingModule.components],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule
  ]
})
export class ProdutoModule { }
