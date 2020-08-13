import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { Produto } from 'src/app/shared/models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  public buscarTodosProdutos(): Observable<Produto[]> {
    return this.http.get(`${this.API}produtos/all`).pipe(
      map((res:{ produtos: { mensagem: string, resultado: any[]}})  => res.produtos.resultado),
      catchError(this.handleError)
    )
  }

  public insertProduto(produto:Produto): Observable<any> {
    return this.http.post(`${this.API}produtos/register`, produto).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }
}
