import { Router } from "express";
import DoacaoCTRL from "../Controle/DoacaoCTRL.js";

const doacaoCTRL = new DoacaoCTRL();
const rotaDoacao = Router();
rotaDoacao.get("/", doacaoCTRL.consultar);
rotaDoacao.post("/", doacaoCTRL.gravar);
rotaDoacao.get("/:codigo", doacaoCTRL.consultar);
export default rotaDoacao;