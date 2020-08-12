import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/models/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.API;
  constructor(private http:HttpClient) { }

  public requisicaoAuth(usuario:Usuario): Observable<any> {
      return this.http.post(`${this.API}auth/authenticate`, usuario).pipe(
        catchError(this.handleError)
      )
  }

  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }
}
