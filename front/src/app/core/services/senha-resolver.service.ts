import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhaResolverService implements Resolve<object> {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    const token = route.paramMap.get('token');
    console.log(token);
    if(+token){
      return of({ token: null, error: 'Token inválido'})
    }
    return of({ token: token })
  }
}
