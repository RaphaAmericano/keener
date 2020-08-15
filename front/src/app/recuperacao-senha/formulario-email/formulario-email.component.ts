import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-formulario-email',
  templateUrl: './formulario-email.component.html',
  styleUrls: ['./formulario-email.component.scss']
})
export class FormularioEmailComponent implements OnInit {

  formulario: FormGroup;
  usuario:Usuario = new Usuario();
  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
    })
  }
  public enviar(): void {
    if(this.formulario.valid){
      this.usuario.email = this.formulario.value.email;
      console.log(this.usuario);
      this.authService.emailRecuperacao(this.usuario.email).subscribe(
        res => console.log(res),
        error => this.abrirSnackBar(error),
        () => this.router.navigate(['login'])
      )
    }
  }

  public abrirSnackBar(mensagem): void {
    this._snackBar.open(`Erro ao logar: ${mensagem}`, "Tente novamente", {
      duration:4000
    })
  }
}
