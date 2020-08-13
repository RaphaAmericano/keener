import { Usuario } from './usuario';
import { Produto } from './produto';

export class Movimentacao {
    horario:Date;
    id_movimentacao:number;
    id_produto:number;
    id_usuario:number;
    quantidade:number;
    tipo:boolean;
    usuario:Usuario;
    produto:Produto;
    constructor(){}
}