import { Usuario } from '../../shared/models/usuario';
import { CadastroUsuarioActions } from './cadastro.actions';
import { CadastroActionTypes } from './cadastro.types.enum';

export interface CadastroUsuarioState {
    nome: string;
    email: string;
    senha: string;
    confirma_senha: string;
}

const initialState: CadastroUsuarioState = {
    nome: '',
    email: '',
    senha: '',
    confirma_senha: ''
}

export function reducer(state = initialState, action: CadastroUsuarioActions): CadastroUsuarioState {
    switch(action.type){
        case CadastroActionTypes.SetNomeCadastroUsuario:
            return {
                ...state,
                nome:action.payload
            }
        default:
            return state;
    }
    
}