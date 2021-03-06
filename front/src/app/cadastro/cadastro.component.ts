import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../core/services/usuario.service';
import { Usuario } from '../shared/models/usuario';
import { CustomValidatorsService } from '../core/services/custom.validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
// export class CadastroComponent implements OnInit, MatFormFieldControl<FormularioUsuario> {
export class CadastroComponent implements OnInit {

  usuario:Usuario = new Usuario();
  formulario: FormGroup;
  visibilidadePassword:boolean = true;
  visibilidadeConfirmaPassword:boolean = true;
  constructor(
    private formBuider: FormBuilder, 
    private usuarioService:UsuarioService, 
    private router:Router,
    private authService:AuthService) {
      this.authService.loginStatus.subscribe();
    }

  ngOnInit(): void {
    this.formulario = this.formBuider.group({
      nome:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuider.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirma_password:['', [Validators.required, Validators.minLength(3)]]
      }, { validator: CustomValidatorsService.passwordMatch })
    })
  }

  public cadastrar(): void {
    if(this.formulario.valid){
      this.usuario.email = this.formulario.value.email;
      this.usuario.name = this.formulario.value.nome;
      this.usuario.password = this.formulario.value.passwordGroup.password;

      this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
        res => console.log(res),
        error => console.error(error),
        () => this.router.navigate(['login'])
      )
    }
    
  }

}
