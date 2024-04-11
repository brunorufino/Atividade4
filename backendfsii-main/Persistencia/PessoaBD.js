import Pessoas from "../Modelo/Pessoas.js";
import conectar from "./Conexao.js";

export default class PessoaBD {
  async gravar(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO pessoas(cpf,nome,nascimento,endereco,cidade,telefone,tipo,profissao1,email) VALUES (?,?,?,?,?,?,?,?,?) ";
      const values = [
        pessoas.cpf,
        pessoas.nome,
        pessoas.nascimento,
        pessoas.endereco,
        pessoas.cidade,
        pessoas.telefone,
        pessoas.tipo,
        pessoas.profissao1,
        pessoas.email      
      ];
      
      await conexao.query(sql, values);
      conexao.release()
    }
  }

  async atualizar(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conexao = await conectar();
      const sql =
        "UPDATE pessoas SET nome=?,nascimento=?,endereco=?,cidade=?,telefone=?,tipo=?,profissao1=?,email=? WHERE cpf=?";
      const values = [
        pessoas.nome,
        pessoas.nascimento,
        pessoas.endereco,
        pessoas.cidade,
        pessoas.telefone,
        pessoas.tipo,
        pessoas.profissao1,
        pessoas.email, 
        pessoas.cpf
      ];
      await conexao.query(sql, values);
      conexao.release()
    }
  }
  async excluir(pessoas) {
    if (pessoas instanceof Pessoas) {
      const conexao = await conectar();
      const sql = "DELETE FROM pessoas WHERE cpf=? ";
      const values = [pessoas.cpf];
      await conexao.query(sql, values);
      conexao.release()
    }
  }
  async consultar(term) {
    const conexao = await conectar();
    const sql = "SELECT * FROM pessoas";
    const values = ["%" + term + "%"];
    const [rows] = await conexao.query(sql, values);
    const listPessoas = [];
    for (const row of rows) {
      const pessoas = new Pessoas(
        row["cpf"],
        row["nome"],
        row["nascimento"],
        row["endereco"],
        row["cidade"],
        row["telefone"],
        row["tipo"],
        row["profissao1"],
        row["email"]     
        
        
        
      );
      listPessoas.push(pessoas);
    }
    conexao.release()
    return listPessoas;
  }
}
