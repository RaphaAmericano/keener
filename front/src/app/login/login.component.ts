import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();
  formulario: FormGroup;
  visibilidadePassword:boolean = true;

  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  public login(): void {
    if(this.formulario.valid){
      this.usuario.email = this.formulario.value.email;
      this.usuario.password = this.formulario.value.password;
      this.authService.requisicaoAuth(this.usuario).subscribe(
        res => {
          this.authService.guardarLocalStorage(res);
          this.authService.armarzenarUsuario(res);
        },
        err => this.abrirSnackBar(err.mensagem.error),
        () => this.router.navigate(['/produto'])
      )
    }
  }
  public abrirSnackBar(mensagem): void {
    this._snackBar.open(`Erro ao logar: ${mensagem}`, "Tente novamente", {
      duration:4000
    })
  }


}
