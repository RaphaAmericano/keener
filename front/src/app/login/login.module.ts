import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginRoutingModule.components],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports:[LoginComponent],

})
export class LoginModule { }
