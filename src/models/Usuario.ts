import type Postagem from "./Postagem";

export default interface Usuario { // definição da interface Usuario
    id: number; 
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    postagem?: Postagem[] | null; // relacionamento opcional com Postagem, pode ser nulo ou um array de Postagem
}