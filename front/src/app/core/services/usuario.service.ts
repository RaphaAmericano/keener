import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = environment.API;
  
  constructor(private http:HttpClient) {}

  public buscarTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.API}auth/usuarios`).pipe(
      catchError(this.handleError)
    )
  }

  public cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API}auth/register`, usuario).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }

}
