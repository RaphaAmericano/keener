import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map  } from 'rxjs/operators';
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
  // nao retornar observable nesse caso
  public buscarUsuarioId(id: number): Observable<Usuario> {
    return this.http.get(`${this.API}auth/usuarios/${id}`).pipe(
      map( (res: { resultado:{ mensagem:string, resultado:object[]} } ) => {
          return Object.assign(new Usuario, res.resultado.resultado[0] ) }
      ),
      catchError(this.handleError)
    )
  }

  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }

}
