import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL {

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {

            const doacao = new Doacao();

            doacao.consultar('').then((doacoes) => {
                resposta.status(200).json(doacoes);

            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido! Consulte a documentação da API'
            });
        }
    }

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            
            const dados = requisicao.body;            
            const dataDoacao = dados.dataDoacao;
            const cpfPessoa = dados.cpfPessoa;
            const listaItens = dados.listaItens;

            if (dataDoacao && cpfPessoa && listaItens) {

                const doacao = new Doacao(0, dataDoacao, cpfPessoa, listaItens);

                doacao.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: doacao.codigo,
                        mensagem: 'Doação gravada com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Registro inválido! Informe adequadamente todos os dados da doação conforme a documentação da API'
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }


    // atualizar(requisicao, resposta) {
    //     resposta.type('application/json');

    //     if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            
    //         const dados = requisicao.body;
    //         const codigo = dados.codigo;
    //         const cpfPessoa = dados.cpfPessoa;
    //         const dataDoacao = dados.dataDoacao;
    //         const listaItens = dados.listaItens;

    //         if (codigo && cpfPessoa && dataDoacao && listaItens) {

    //             const doacao = new Doacao(codigo, cpfPessoa, dataDoacao, listaItens);

    //             doacao.atualizar().then(() => {
    //                 resposta.status(200).json({
    //                     status: true,
    //                     mensagem: 'Doação atualizada com sucesso!'
    //                 });

    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     status: false,
    //                     mensagem: erro.message
    //                 });
    //             });

    //         } else {
    //             resposta.status(400).json({
    //                 status: false,
    //                 mensagem: 'Atualização inválida! Informe adequadamente todos os dados da doação conforme a documentação da API'
    //             });
    //         }
    //     } else {
    //         resposta.status(400).json({
    //             status: false,
    //             mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
    //         });
    //     }
    // }

    // excluir(requisicao, resposta) {

    //     resposta.type('application/json');

    //     if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {

    //         const dados = requisicao.body;
    //         const codigo = dados.codigo;

    //         if (codigo) {

    //             const doacao = new Doacao(codigo);

    //             doacao.remover().then(() => {
    //                 resposta.status(200).json({
    //                     status: true,
    //                     mensagem: 'Doação excluída com sucesso!'
    //                 });

    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     status: false,
    //                     mensagem: erro.message
    //                 });
    //             });

    //         } else {
    //             resposta.status(400).json({
    //                 status: false,
    //                 mensagem: 'Exclusão inválida! Informe adequadamente o ID da doação conforme a documentação da API.'
    //             });
    //         }
    //     } else {
    //         resposta.status(400).json({
    //             status: false,
    //             mensagem: 'Método não permitido ou doação no formato JSON não fornecido! Consulte a documentação da API'
    //         });
    //     }
    // }
}





// import Pessoas from "../Modelo/Pessoas.js";
// import Doacao from "../Modelo/Doacao.js";
// import Produto from "../Modelo/ProdutoPid.js";
// import ItemDoado from "../Modelo/ProdutoDoado.js";

// export default class DoacaoCTRL {
//   gravar(requisicao, resposta) {
//     resposta.type("application/json");
//     if (requisicao.method === "POST" && requisicao.is("application/json")) {
//       const dados = requisicao.body;
//       const dataDoacao = dados.dataDoacao;
//       const pessoa = new Pessoas(dados.pessoa.cpf);
//       const itens = dados.itens;
//       let listaItens = [];
//       for (const item of itens) {
//         const produto = new Produto(item.codigo);
//         const itemDoado = new ItemDoado(produto, item.produto);
//         listaItens.push(itemDoado);
//       }
//       const doacao = new Doacao(0, dataDoacao, pessoa, listaItens);
//       doacao
//         .gravar()
//         .then(() => {
//           resposta.json({
//             status: true,
//             mensagem: "Doacao gravada com sucesso",
//           });
//         })
//         .catch((e) => {
//           resposta.json({
//             status: false,
//             mensagem: "Não foi possível gravar a doação	" + e.message,
//           });
//         });
//     } else {
//       resposta.json({
//         status: false,
//         mensagem: "Requisição inválida",
//       });
//     }
//   }

//   consultar(requisicao, resposta) {
//     resposta.type("application/json");
//     if (requisicao.method === "GET" && requisicao.is("application/json")) {
//       const codigo = requisicao.params.codigo;
//       let doacao = new Doacao();
//       if (codigo) {
//         doacao
//           .consultarCodigo(codigo)
//           .then((doacao) => {
//             resposta.json(doacao);
//           })
//           .catch((e) => {
//             resposta.json({
//               status: false,
//               mensagem:
//                 "Não foi possível retornar a lista de doações" + e.message,
//             });
//           });
//       } else {
//         doacao.consultar().then((doacoes) => {
//           resposta.json(doacoes);
//         });
//       }
//     } else {
//       resposta.json({
//         status: false,
//         mensagem: "Requisição inválida",
//       });
//     }
//   }
// }
