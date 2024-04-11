import FuncionarioDAO from "../Persistencia/funcionarioDAO.js";

export default class Funcionario {

    #func_codigo;
    #func_nome;
    #func_dataAdmissao;
    #departamentos;

    constructor(codigo=0, nome="", dataAdmissao, departamentos ){
        this.#func_codigo = codigo;
        this.#func_nome = nome;
        this.#func_dataAdmissao = dataAdmissao;
        this.#departamentos = departamentos;

    }

    //métodos de acesso públicos

    get codigo(){
        return this.#func_codigo;
    }

    set codigo(novoCodigo){
        this.#func_codigo = novoCodigo;
    }

    get nome(){
        return this.#func_nome;
    }

    set nome(novoNome){
        this.#func_nome = novoNome;
    }

    get dataAdmissao(){
        return this.#func_dataAdmissao;
    }

    set dataAdmissao(novaData){
        this.#func_dataAdmissao = novaData;
    }
    
    get departamentos(){
        return this.#departamentos;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#func_codigo,
            nome:this.#func_nome,
            dataAdmissao: this.#func_dataAdmissao,
            departamentos: this.#departamentos
        }
    }

    async gravar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.gravar(this);
    }

    async excluir(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.excluir(this);
    }

    async atualizar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.atualizar(this);

    }

    async consultar(parametro){
        const funcDAO = new FuncionarioDAO();
        return await funcDAO.consultar(parametro);
    }
}