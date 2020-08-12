import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from 'src/app/core/services/produto.service';
import { Produto } from '../../shared/models/produto';
@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  produtos: Produto[];
  source = new MatTableDataSource(this.produtos);
  colunas: string[] = ['nome', 'quantidade'];
  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.buscarTodosProdutos().subscribe(
      res => this.produtos = res,
      error => console.error(error),
      () => this.source.data = this.produtos
    )
  }

  public aplicarFiltro(evento: Event): void {
    const valorFiltrado = (evento.target as HTMLInputElement).value;
    this.source.filter = valorFiltrado.trim().toLocaleLowerCase();
  }

}
