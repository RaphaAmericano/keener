import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MovimentacaoService } from '../../core/services/movimentacao.service';
import { Movimentacao } from '../../shared/models/movimentacao';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-movimentacao-lista',
  templateUrl: './movimentacao-lista.component.html',
  styleUrls: ['./movimentacao-lista.component.scss']
})
export class MovimentacaoListaComponent implements OnInit {

  movimentacoes:Movimentacao[];
  source = new MatTableDataSource(this.movimentacoes);
  colunas: string[] = ['nome', 'usuario', 'data', 'quantidade'];
  @ViewChild(MatSort, { static: true } ) sort: MatSort;
  constructor(private movimentacaoService: MovimentacaoService) { }

  ngOnInit(): void {
    this.movimentacaoService.buscarTodasMovimentacoes()
    // Buscar e formar objetos para produto e usuarios apartir do id
    // .pipe(
    //   concatMap(),
    //   concatMap()
    // )
    
    .subscribe(
      res => {
        this.movimentacoes = res;
        this.movimentacoes.map(movimentacao => movimentacao.tipo = !!movimentacao.tipo);
      },
      error => console.error(error),
      () => {
        this.source.data = this.movimentacoes;
        this.source.sort = this.sort;
        console.log(this.movimentacoes)
      }
    )
  }

  public aplicarFiltro(evento:Event): void {
    const valorFiltrado = (evento.target as HTMLInputElement).value;
    this.source.filter = valorFiltrado.trim().toLocaleLowerCase();
  }

}
