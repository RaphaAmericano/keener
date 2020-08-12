import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { reducer } from './state/cadastro.reducer';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule,
    StoreModule.forFeature('cadastro_usuario', reducer),
    // EffectsModule.forFeature([])
  ],
  exports:[CadastroComponent],
  declarations: [CadastroRoutingModule.components]
})
export class CadastroModule { }
