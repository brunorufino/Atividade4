export default class DepartamentoFuncionario{

    #departamento;
    #cargo;

    constructor( departamento, cargo){

        this.#departamento = departamento;
        this.#cargo = cargo;
    }

    get departamento(){
        return this.#departamento;
    }

    get cargo(){
        return this.#cargo;
    }
}