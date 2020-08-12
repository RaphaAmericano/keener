import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from 'src/app/core/services/produto.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const DATA: object[] = [
  { id_produto: 1, quantidade: 2, nome: 'Pasta de dente' },
  { id_produto: 2, quantidade: 22, nome: 'Escova' },
  { id_produto: 20, quantidade: 12, nome: 'Cotonete' }
]

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  produtos: object[];
  source = new MatTableDataSource(this.produtos);
  colunas: string[] = ['nome', 'quantidade'];
  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.buscarTodosProdutos().subscribe(
      res => this.produtos = res.produtos.resultado,
      error => console.error(error),
      () => this.source.data = this.produtos
    )
  }

}
