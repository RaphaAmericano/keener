import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidatorsService } from 'src/app/core/services/custom.validators.service';

@Component({
  selector: 'app-formulario-nova',
  templateUrl: './formulario-nova.component.html',
  styleUrls: ['./formulario-nova.component.scss']
})
export class FormularioNovaComponent implements OnInit {

  formulario: FormGroup;
  usuario:Usuario = new Usuario();
  visibilidadePassword:boolean = true;
  visibilidadeConfirmaPassword:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    const resolved: object = this.route.snapshot.data['resolveData'];
    // if(resolved == undefined){
    //   this.router.navigate(['login'])
    // }
    console.log(resolved);
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirma_password:['', [Validators.required, Validators.minLength(3)]]
      }, { validator: CustomValidatorsService.passwordMatch }),
      token:[resolved['token']]
    })
  }

  public novaSenha(): void {
    if(this.formulario.valid){
      this.usuario.email = this.formulario.value.email;
      this.usuario.token = this.formulario.value.token;
      this.usuario.senha = this.formulario.value.passwordGroup.password;
      console.log(this.usuario);
      this.authService.resetSenha(this.usuario).subscribe(
        res => {
          this.resetarForm();
          console.log(res)
        },
        error => {console.log(error.mensagem.error),
          this.abrirSnackBar(error.mensagem.error.error)},
        () => this.router.navigate(['login'])
      )
    }
  }

  public abrirSnackBar(mensagem): void {
    this._snackBar.open(`Alterar a senha: ${mensagem}`, "Tente novamente", {
      duration:4000
    })
  }

  private resetarForm(): void {
    this.formulario.reset();
  }

}
