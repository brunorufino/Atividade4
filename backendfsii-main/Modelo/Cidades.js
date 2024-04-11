import CidadeBD from "../Persistencia/CidadeBD.js"; 

export default class Cidades { 
  #codigo;
  #nome; 

  constructor(codigo,nome) { 
    this.#codigo = codigo;
    this.#nome = nome; 
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    if (novoCodigo !== '') {
      this.#codigo = novoCodigo;
    }
  }

  get nome() { 
    return this.#nome; 
  }

  set nome(newNome) { 
    this.#nome = newNome; 
  }

  toJSON() { 
    return {
      codigo: this.#codigo,
      nome: this.#nome, 
    };
  }

  async gravar() { 
    const cidadeBD = new CidadeBD(); 
    await cidadeBD.gravar(this); 
  }

  async excluir() { 
    const cidadeBD = new CidadeBD(); 
    await cidadeBD.excluir(this); 
  }

  async atualizar() { 
    const cidadeBD = new CidadeBD(); 
    await cidadeBD.atualizar(this); 
  }

  async consultar(term) { 
    const cidadeBD = new CidadeBD(); 
    const cidades = await cidadeBD.consultar(term); 
    return cidades; 
  }
}
