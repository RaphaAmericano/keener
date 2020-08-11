import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({}, {})
  ],
  providers:[
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
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
