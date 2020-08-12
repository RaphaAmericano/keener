import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { UsuarioService } from './services/usuario.service';
import { HeaderInterceptor} from './interceptors/header.interceptor';
import { CustomValidatorsService } from './services/custom.validators.service';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, {}),
    HttpClientModule
  ],
  providers:[
    UsuarioService,
    CustomValidatorsService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule ){
    if(parentModule){
      throw new Error(
        'Core module já foi carregado. Importar apenas no AppModule'
      )
    }
  }
}
