import Cidades from "../Modelo/Cidades.js";

export default class CidadesCTRL {
  consultar(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      const cidades = new Cidades();
      cidades
        .consultar("")
        .then((cidades) => {
          response.status(200).json(cidades);
        })
        .catch((erro) => {
          response.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Função para gravar uma nova cidade
  gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const nome = data.nome;

      if (nome) {
        const cidade = new Cidades(0,nome);
        cidade
          .gravar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Cidade salva com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Insira todos os dados",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método PUT
  atualizar(request, response) {
    response.type("application/json");
    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const codigo = data.codigo;
      const nome = data.nome;

      if (codigo && nome) {
        const cidades = new Cidades(codigo, nome);
        cidades
          .atualizar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, preencha com os dados corretos",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método DELETE
  excluir(request, response) {
    response.type("application/json");
    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const codigo = data.codigo;
      if (codigo) {
        const cidades = new Cidades(codigo);
        cidades
          .excluir()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Cidade excluída com sucesso",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Falha ao excluir a cidade",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }
}
