import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const declarables = [];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: declarables,
  exports: declarables
})
export class SharedModule { }
