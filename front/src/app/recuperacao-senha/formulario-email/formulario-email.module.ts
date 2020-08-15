import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioEmailRoutingModule } from './formulario-email-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FormularioEmailRoutingModule.components],
  imports: [
    CommonModule,
    FormularioEmailRoutingModule,
    SharedModule
  ]
})
export class FormularioEmailModule { }
