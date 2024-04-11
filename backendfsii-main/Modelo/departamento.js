import DepartamentoDAO from "../Persistencia/departamentoDAO.js";

export default class Departamento{
    #codigo;
    #descricao;
    #localizacao;
    #nome;
    #responsavel;
    #telefone;
    
    constructor(codigo=0,descricao="", localizacao="", 
                nome="", responsavel="", telefone=""
                ){

        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#localizacao = localizacao;
        this.#nome = nome; 
        this.#responsavel = responsavel;
        this.#telefone = telefone;                
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao=novaDesc;
    }

    get localizacao(){
        return this.#localizacao;
    }

    set localizacao(novaLocalizacao){
        this.#localizacao=novaLocalizacao;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome=novoNome;
    }

    get responsavel(){
        return this.#responsavel;
    }

    set responsavel(novoResponsavel){
        this.#responsavel=novoResponsavel;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone=novoTelefone;
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            localizacao:this.#localizacao,
            nome:this.#nome,
            responsavel:this.#responsavel,
            telefone:this.#telefone
        }
    }

     async gravar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.gravar(this);
     }
 
     async excluir(){
        const depDAO = new DepartamentoDAO();
        await depDAO.excluir(this);
     }
 
     async alterar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.atualizar(this);
     }
 
     async consultar(termo){
        const depDAO = new DepartamentoDAO();
        return await depDAO.consultar(termo);
     }

}