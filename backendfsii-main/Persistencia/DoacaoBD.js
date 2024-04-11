import Doacao from "../Modelo/Doacao.js";
import Conect from "./Conexao.js";
import Produto from "../Modelo/ProdutoPid.js";
import CategoriaProd from "../Modelo/CategoriaProd.js";
import Pessoas from "../Modelo/Pessoas.js";

export default class DoacaoBD{
  async gravar(doacao){
    if (doacao instanceof Doacao){
      const conexao = await Conect();
      try{      
      await conexao.beginTransaction();
      const sql = "INSERT INTO doacao(dataDoacao, cpfPessoa) VALUES(?,?)"
      const valores = [doacao.dataDoacao, doacao.cpfPessoa];
      const resultado = await conexao.query(sql, valores);
      doacao.codigo = resultado[0].insertId;
      for(const item of doacao.listaItens){
        const sql2 = "INSERT INTO doacao_produto(codigoProduto, codigoDoacao, quantidade ) VALUES (?,?,?)"
        const parametros = [item.codigoProduto, doacao.codigo, item.quantidade];
        await conexao.query(sql2, parametros);
        
      }
      }catch(e){
        await conexao.rollback();
        throw e;
      }
      await conexao.commit();
      conexao.release()
    }
  }

    async gravar(doacao) {
        if (doacao instanceof Doacao) {
            const conexao = await Conect();
            try {
                await conexao.beginTransaction();
                const sql = "INSERT INTO doacao(cpfPessoa, dataDoacao) VALUES (?,?)";
                const valores = [doacao.cpfPessoa ,doacao.dataDoacao];
                const resultado = await conexao.query(sql, valores);
                doacao.codigo = resultado[0].insertId;

                for (const item of doacao.listaItens) {
                    const sql2 = "INSERT INTO doacao_produto(codigoProduto, codigoDoacao, quantidade) VALUES (?,?,?)";
                    const parametros = [item.codigoProduto, doacao.codigo, item.quantidade];
                    await conexao.query(sql2, parametros);
                }

                await conexao.commit();
            } catch (e) {
                await conexao.rollback();
                throw e;
            } finally {
                conexao.release();
            }
        }
    }


    async consultar() {
        const listaDoacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM doacao as d \
                  INNER JOIN pessoas as p ON p.cpf = d.cpfPessoa \
                  ORDER BY d.dataDoacao";

            const [doacoes] = await conexao.query(sql);

            for (const rows of doacoes) {
                const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["tipo"], rows["profissao1"], rows["email"]);
                const doacao = new Doacao(rows["codigo"], rows["dataDoacao"], pessoa, []);

                const sqlitens = "SELECT pr.*, dp.*, cp.codigo AS codigoCategoria, cp.categoria FROM doacao_produto as dp \
                          INNER JOIN produto as pr ON dp.codigoProduto = pr.codigo \
                          INNER JOIN categoria_produto as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigoDoacao = ?";

                const parametros = [doacao.codigo];
                const [itensDoacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensDoacao) {
                    const categoria = new CategoriaProd(item["codigoCategoria"], item["categoria"]);
                    const produto = new Produto(item["codigo"], item["nome"], item["metrica"], item["descricao"], categoria.codigo, categoria.categoria);

                    listaItens.push({ produto, quantidade: item["quantidade"] });
                }

                doacao.listaItens = listaItens;
                listaDoacoes.push(doacao);
            }

            return listaDoacoes;
        } finally {
            conexao.release();
        }
    }

    async consultarCodigo(codigo) {
        const listaDoacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM doacao as d \
                  INNER JOIN pessoas as p ON p.cpf = d.cpfPessoa \
                  WHERE d.codigo = ? \
                  ORDER BY d.dataDoacao";

            const parametros = [codigo];
            const [doacoes] = await conexao.query(sql, parametros);

            for (const rows of doacoes) {
                const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["tipo"], rows["profissao1"], rows["email"]);
                const doacao = new Doacao(rows["codigo"], rows["dataDoacao"], pessoa, []);

                const sqlitens = "SELECT * FROM doacao_produto as dp \
                          INNER JOIN produto as pr ON dp.codigoProduto = pr.codigo \
                          INNER JOIN categoriaproduto as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigoDoacao = ?";

                const parametros = [doacao.codigo];
                const [itensDoacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensDoacao) {
                    const categoria = new CategoriaProd(item["codigo_categoria"], item["categoria"]);
                    const produto = new Produto(item["codigoProduto"], item["nome"], item["metrica"], item["descricao"], categoria);
                    listaItens.push({ produto, quantidade: item["quantidade"] });
                }

                doacao.listaItens = listaItens;
                listaDoacoes.push(doacao);
            }

            return listaDoacoes;
        } finally {
            conexao.release();
        }
    }

    
}

// 2:06:43
