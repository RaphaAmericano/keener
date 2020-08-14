import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MovimentacaoService } from '../../core/services/movimentacao.service';
import { Movimentacao } from '../../shared/models/movimentacao';
import { concatMap, tap, map, mergeMap, switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutoService } from 'src/app/core/services/produto.service';
@Component({
  selector: 'app-movimentacao-lista',
  templateUrl: './movimentacao-lista.component.html',
  styleUrls: ['./movimentacao-lista.component.scss']
})
export class MovimentacaoListaComponent implements OnInit {

  movimentacoes:Movimentacao[] | object[];
  source = new MatTableDataSource(this.movimentacoes);
  colunas: string[] = ['nome', 'usuario', 'data', 'quantidade'];
  @ViewChild(MatSort, { static: true } ) sort: MatSort;
  constructor(
    private movimentacaoService: MovimentacaoService, 
    private usuarioService:UsuarioService,
    private produtoService:ProdutoService) { }

  ngOnInit(): void {
    this.movimentacaoService.buscarTodasMovimentacoes()
    // Buscar e formar objetos para produto e usuarios apartir do id
    .pipe(
      concatMap(
        (res:object[]) => res.map(
          (mov: Movimentacao) => { 
            this.usuarioService.buscarUsuarioId(mov.id_usuario).subscribe(
              res => {
                delete res.password;
                delete res['senha'];
                delete res.token_expires;
                delete res.token;
                mov.usuario = res;
              }
            )
            this.produtoService.buscarProdutoId(mov.id_produto).subscribe(
              res => mov.produto = res
            )
            return res as Movimentacao[];
          }
        )
      )
    ).subscribe( 
      res => this.movimentacoes = res,
      error => console.error(error),
      () => {
        this.source.data = this.movimentacoes;
        this.source.sort = this.sort;
      }
    )
  }

  public aplicarFiltro(evento:Event): void {
    const valorFiltrado = (evento.target as HTMLInputElement).value;
    this.source.filter = valorFiltrado.trim().toLocaleLowerCase();
  }

}
