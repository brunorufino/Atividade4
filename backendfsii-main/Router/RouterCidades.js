import { Router } from "express";
import CidadeCTRL from "../Controle/CidadesCTRL.js"; 

const routerCidade = new Router(); 
const cidadeCTRL = new CidadeCTRL(); 

routerCidade
  .get("/", cidadeCTRL.consultar) 
  .put("/", cidadeCTRL.atualizar) 
  .post("/", cidadeCTRL.gravar) 
  .delete("/", cidadeCTRL.excluir); 

export default routerCidade; 
