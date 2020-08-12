import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module'; 
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    // StoreDevtoolsModule.instrument({
    //   name: 'Keener App Devtools',
    //   maxAge: 25,
    //   logOnly: environment.production
    // }),
    // EffectsModule.forRoot([]),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
