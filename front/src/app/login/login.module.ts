import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports:[LoginComponent],
  declarations: [LoginRoutingModule.components],

})
export class LoginModule { }
