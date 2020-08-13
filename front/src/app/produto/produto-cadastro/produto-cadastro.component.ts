import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/models/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/core/services/produto.service';
import { CustomValidatorsService } from 'src/app/core/services/custom.validators.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.scss']
})
export class ProdutoCadastroComponent implements OnInit {

  produto:Produto = new Produto();
  formulario: FormGroup;
  constructor(
    private formBuilder:FormBuilder, 
    private produtoService:ProdutoService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      quantidade: [0, CustomValidatorsService.numeroPositivo]
      //todo: desenvolver um validador para aceitar apenas numeros positivos
    })
  }

  public cadastro(): void {
    if(this.formulario.valid){
      this.produto.nome = this.capitalizePrimeiraLetra(this.formulario.value.nome); 
      this.produto.quantidade = this.formulario.value.quantidade ? this.formulario.value.quantidade : 0; 
      this.produtoService.insertProduto(this.produto).subscribe(
        res => this.abrirSnackBar(res.mensagem),
        error => this.abrirSnackBar(error, "Tente novamente"),
        () => this.resetarForm()
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

  private capitalizePrimeiraLetra(palavra:string): string {
    return palavra[0].toUpperCase() + palavra.substr(1).toLowerCase();
  }

}
