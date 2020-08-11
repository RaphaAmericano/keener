import { Usuario } from './usuario';

export class FormularioUsuario extends Usuario {
    public confirma_senha: string;
    constructor(){
        super();
    }
}
