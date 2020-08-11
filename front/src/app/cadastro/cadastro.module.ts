import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule
  ],
  exports:[CadastroComponent],
  declarations: [CadastroRoutingModule.components]
})
export class CadastroModule { }
