import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormularioUsuario } from '../shared/models/formulario.usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../core/services/http.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
// export class CadastroComponent implements OnInit, MatFormFieldControl<FormularioUsuario> {
export class CadastroComponent implements OnInit {

  modelUsuario:FormularioUsuario = new FormularioUsuario();
  formulario: FormGroup;
  visibilidadeSenha:boolean = true;
  visibilidadeConfirmaSenha:boolean = true;
  constructor(private formBuider: FormBuilder, private httpService:HttpService) {}

  ngOnInit(): void {
    this.formulario = this.formBuider.group({
      nome:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength(3)]],
      confirma_senha:['', [Validators.required, Validators.minLength(3)]]
    })
  }

  public cadastrar(): void {
    console.log(this.formulario);
    this.httpService.buscarTodosUsuarios().subscribe(
      res => console.log(res)
    );
  }

}
