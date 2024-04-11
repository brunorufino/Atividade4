export default class ItemDoado{
  #produto

  constructor(produto){
    this.#produto = produto;    
  }

  get produto(){
    return this.#produto
  }

  set produto(novoProduto){
    this.#produto = novoProduto
  }

  toJSON(){
    return{
      "produto":this.#produto 
       }
  }

}