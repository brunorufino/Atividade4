import Departamento from "../Modelo/departamento.js";

export default class DepartamentoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {            
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const localizacao = dados.localizacao;
            const nome = dados.nome;
            const responsavel = dados.responsavel;
            const telefone = dados.telefone;

            if (descricao,localizacao,nome,responsavel,telefone) {
                const departamento = new Departamento(0,descricao,localizacao,nome,responsavel,telefone);
                //resolver a promise
                departamento.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": departamento.codigo,
                        "mensagem": "Departamento incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos do departamento!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um departamento!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
          
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const localizacao = dados.localizacao;
            const nome = dados.nome;
            const responsavel = dados.responsavel;
            const telefone = dados.telefone;

            if (codigo && descricao&&localizacao&&nome&&responsavel&&telefone) {
                const departamento = new Departamento(codigo,descricao,localizacao,nome,responsavel,telefone);
                //resolver a promise
                departamento.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Departamento atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos do departamento!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar o departamento!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const departamento = new Departamento(codigo);
                //resolver a promise
                departamento.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Departamento excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do departamento!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um departamento!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
       
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const departamento = new Departamento();
            departamento.consultar(termo).then((listaDepartamentos)=>{
              /*  resposta.json(
                    {
                        status:true,
                        listaDepartamentos
                    });*/
                    resposta.status(200).json(listaDepartamentos);
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os departamentos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar departamentos!"
            });
        }
    }
}