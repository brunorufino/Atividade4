import { Router } from "express";
import FuncionarioCtrl from "../Controle/funcionarioCtrl.js";

const funCtrl = new FuncionarioCtrl();
const rotaFuncionario = new Router();

rotaFuncionario
//.get('/', funCtrl.consultar)
//.get('/:termo', funCtrl.consultar)
.post('/', funCtrl.gravar)


export default rotaFuncionario;