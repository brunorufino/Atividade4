import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import routerCidade from "./Router/RouterCidades.js";
import rotaProduto from "./Router/rotaProduto.js";
import rotaCategoriaProd from "./Router/rotaCategoriaProd.js";
import cors from "cors";
import rotaDoacao from "./Router/rotaDoacao.js";
import rotaDepartamento from "./Router/rotaDepartamento.js";
import rotaFuncionario from "./Router/rotaFuncionario.js";

const porta=4016;
const hostname = '0.0.0.0';
const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/pessoas", routerPessoa);
server.use("/cidades", routerCidade);
server.use("/produto", rotaProduto);
server.use("/categoria", rotaCategoriaProd);
server.use("/departamento",rotaDepartamento);
server.use("/doacao", rotaDoacao);
server.use("/funcionario",rotaFuncionario);


server.listen(porta,hostname, () => {
  console.log("Backend ouvindo em http://"+hostname+":"+porta);
});
 