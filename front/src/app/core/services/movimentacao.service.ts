import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Movimentacao } from 'src/app/shared/models/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private readonly API = environment.API;

  constructor(private http:HttpClient) { }

  public buscarTodasMovimentacoes(): Observable<any> {
    return this.http.get(`${this.API}movimentacoes/all`).pipe(
      map((res:{ resultado:{ mensagem:string, resultado:any[]  }}) => res.resultado.resultado),
      catchError(this.handleError)
    )
  }

  public inserirMovimentacao(mov:Movimentacao): Observable<any> {
    return this.http.post(`${this.API}movimentacoes/register`, mov).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }
}
