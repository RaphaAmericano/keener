import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { ProdutoService } from './services/produto.service';
import { HeaderInterceptor} from './interceptors/header.interceptor';
import { TokenInterceptor} from './interceptors/token.interceptor';
import { CustomValidatorsService } from './services/custom.validators.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers:[
    UsuarioService,
    AuthService,
    ProdutoService,
    CustomValidatorsService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
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
