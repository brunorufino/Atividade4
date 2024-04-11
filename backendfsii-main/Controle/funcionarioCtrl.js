import Departamento from "../Modelo/departamento.js";
import DepartamentoFuncionario from "../Modelo/departamentoFuncionario.js";
import Funcionario from "../Modelo/funcionario.js";

export default class FuncionarioCtrl 
{

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
           
            const dados = requisicao.body;
            dados.departamentos = dados.departamentos.filter(departamento => Object.keys(departamento).length !== 0);

            const nome = dados.nome;
            const dataAdmissao = dados.dataAdmissao;
            const departamentoFuncionario = dados.departamentos;
           
            const departamentos = [];
            for (const departamento of departamentoFuncionario) {

                   
                    const dep = new Departamento(departamento.codigo);
                   
                 //   const objDepartamentoFuncionario = new DepartamentoFuncionario(departamento.codigo,departamento.cargo);
                    const objDepartamentoFuncionario = new DepartamentoFuncionario(departamento.codigo);
                  
                    departamentos.push(objDepartamentoFuncionario);
                    
            }
          
          

            const funcionario = new Funcionario(0,nome,dataAdmissao,departamentos);
            
                //resolver a promise
                funcionario.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": funcionario.codigo,
                        "mensagem": "Funcionário cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrado o funcionário:" + erro.message
                        });
                    });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um funcionário!"
            });
        }
    }

    
   
    consultar(requisicao, resposta) {
        resposta.type('application/json');
       
        let termo = requisicao.params.termo;
        
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const funcionario = new Funcionario();
            funcionario.consultar(termo).then((listaFuncionarios) => {
                resposta.json(
                    {
                        status: true,
                        listaFuncionarios
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os funcionários: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar funcionários!"
            });
        }
    }
    
}