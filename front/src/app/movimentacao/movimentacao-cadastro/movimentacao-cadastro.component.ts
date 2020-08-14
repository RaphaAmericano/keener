import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/core/services/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Produto } from 'src/app/shared/models/produto';
import { CustomValidatorsService } from 'src/app/core/services/custom.validators.service';
import { MovimentacaoService } from 'src/app/core/services/movimentacao.service';
import { Movimentacao } from 'src/app/shared/models/movimentacao';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-movimentacao-cadastro',
  templateUrl: './movimentacao-cadastro.component.html',
  styleUrls: ['./movimentacao-cadastro.component.scss']
})
export class MovimentacaoCadastroComponent implements OnInit {

  formulario:FormGroup;
  produtos:Produto[];
  movimentacao:Movimentacao;
  valorSelecionado:string | number;
  constructor(
    private formBuilder:FormBuilder, 
    private movimentacaoService:MovimentacaoService,
    private produtoService:ProdutoService,
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.produtoService.buscarTodosProdutos().subscribe(
      produtos => this.produtos = produtos
    );
    this.formulario = this.formBuilder.group({
      produto: ['', [Validators.required, Validators.minLength(3)]],
      quantidade: [0, [Validators.required, CustomValidatorsService.diferenteZero]]
    });
    console.log(this.authService.getUsuarioLoggado())
  }

  public cadastro(): void {
    this.movimentacao = new Movimentacao();
    console.log(this.formulario.valid)
    console.log(this.formulario)
    this.formulario.get('produto').setValue(this.valorSelecionado);
    console.log(this.formulario.value)
    if(this.formulario.valid){
      this.movimentacao.id_produto = this.formulario.get('produto').value;
      this.movimentacao.quantidade = this.formulario.get('quantidade').value;
      this.movimentacaoService.inserirMovimentacao(this.movimentacao).subscribe(
        res => console.log(res),
        error => console.error(error),
        () => {
          this.abrirSnackBar('teste');
          this.resetarForm();
        }
      )
    }
  }

  public abrirSnackBar(mensagem, mensagem_fechar = "Fechar"): void {
    this._snackBar.open(`${mensagem}`, mensagem_fechar, {
      duration:4000
    })
  }

  private resetarForm(): void {
    this.formulario.reset();
  }

}
