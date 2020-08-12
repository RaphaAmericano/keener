import { Usuario } from '../../shared/models/usuario';

import { Action } from '@ngrx/store';
import { CadastroActionTypes } from './cadastro.types.enum';

export class SetNomeCadastroUsuario implements Action {
    readonly type = CadastroActionTypes.SetNomeCadastroUsuario;
    constructor(public payload: string){}
}

export class SetEmailCadastroUsuario implements Action {
    readonly type = CadastroActionTypes.SetEmailCadastroUsuario;
    constructor(public payload: string){}
}

export class SetSenhalCadastroUsuario implements Action {
    readonly type = CadastroActionTypes.SetSenhaCadastroUsuario;
    constructor(public payload: string){}
}

export class SetConfirmaSenhalCadastroUsuario implements Action {
    readonly type = CadastroActionTypes.SetConfirmaSenhaCadastroUsuario;
    constructor(public payload: string){}
}

export class Load implements Action {
    readonly type = CadastroActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = CadastroActionTypes.LoadSuccess;
    constructor(public payload:Usuario){}
}

export class LoadFail implements Action {
    readonly type = CadastroActionTypes.LoadFail;
    constructor(public payload:string){}
}
export type CadastroUsuarioActions = SetNomeCadastroUsuario | SetEmailCadastroUsuario | SetSenhalCadastroUsuario | SetConfirmaSenhalCadastroUsuario | Load | LoadSuccess | LoadFail;