import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromCadastroUsuario from './cadastro.reducer';

export interface State extends fromRoot.State {
    cadastro_usuario: fromCadastroUsuario.CadastroUsuarioState;
}

const getCadastroUsuarioFeatureState = createFeatureSelector<fromCadastroUsuario.CadastroUsuarioState>('cadastro_usuario');

export const getNomeCadastroUsuario = createSelector(
    getCadastroUsuarioFeatureState,
    state => state.nome
);
export const getEmailCadastroUsuario = createSelector(
    getCadastroUsuarioFeatureState,
    state => state.email
);
export const getSenhaCadastroUsuario = createSelector(
    getCadastroUsuarioFeatureState,
    state => state.senha
);
export const getConfirmaSenhaCadastroUsuario = createSelector(
    getCadastroUsuarioFeatureState,
    state => state.confirma_senha
);