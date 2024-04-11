import Departamento from "../Modelo/departamento.js";
import DepartamentoFuncionario from "../Modelo/departamentoFuncionario.js";
import Funcionario from "../Modelo/funcionario.js";
import conectar from "./Conexao.js";

export default class FuncionarioDAO{
    async gravar(funcionario){

        if (funcionario instanceof Funcionario){

            const conexao = await conectar();
            await conexao.beginTransaction();

            try {
                    const sql = "INSERT INTO funcionario(func_nome , func_dataAdmissao) VALUES(? , ?);"; 
                    const parametros = [funcionario.nome,funcionario.dataAdmissao];

                   const  retorno = await conexao.execute(sql,parametros);

                    funcionario.codigo = retorno[0].insertId;

                    
                    for (const departamento of funcionario.departamentos) {
                       const sql2 = "INSERT INTO funcionario_departamento (codigo_funcionario, codigo_departamento,cargo) VALUES (?,?,?)";
                      // let parametros2 = [funcionario.codigo,departamento.departamento,departamento.cargo]
                       let parametros2 = [funcionario.codigo,departamento.departamento,null]
                       await conexao.execute(sql2,parametros2);
                    }
                    
                   await conexao.commit();
                   conexao.release();

            } catch (error) {
                  await  conexao.rollback();
                  throw error;
            }

            
        }
    }

    /*
    async atualizar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            await conexao.beginTransaction();
    
            try {
                const sql = `
                    UPDATE funcionario 
                    SET func_nome = ?, func_cargo = ?, func_salario = ?, func_dataAdmissao = ?, func_departamento = ? 
                    WHERE func_codigo = ?`;
                const parametros = [funcionario.nome,funcionario.cargo,funcionario.salario,funcionario.dataAdmissao, funcionario.departamento.codigo,funcionario.codigo];
                
                await conexao.execute(sql, parametros);
    
                // Atualizar os dependentes (se houver)
                if (funcionario.dependentes && funcionario.dependentes.length > 0) {
                    for (const dependente of funcionario.dependentes) {
                        const sql2 = `
                            INSERT INTO funcionario_dependente (func_codigo, dep_codigo, parentesco) 
                            VALUES (?, ?, ?) 
                            ON DUPLICATE KEY UPDATE parentesco = VALUES(parentesco)`;
                        const parametros2 = [funcionario.codigo,dependente.dependente.codigo ?? null,dependente.parentesco ?? null ];
                        await conexao.execute(sql2, parametros2);
                    }
                }
    
                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }
    */
    /*
    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            await conexao.beginTransaction();
    
            try {
                const sqlDependentes = "DELETE FROM funcionario_dependente WHERE func_codigo = ?";
                const parametrosDependentes = [funcionario.codigo];
                await conexao.execute(sqlDependentes, parametrosDependentes);
    
                const sqlFuncionario = "DELETE FROM funcionario WHERE func_codigo = ?";
                const parametrosFuncionario = [funcionario.codigo];
                await conexao.execute(sqlFuncionario, parametrosFuncionario);
    
                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }
*/


    async consultar(termoBusca){
        const listaFuncionarios = [];

        if(!isNaN(termoBusca)){
            const conexao = await conectar();
            const sql = `  SELECT
                                f.func_nome,
                                f.func_dataAdmissao,
                            GROUP_CONCAT(d.dept_nome) AS departamentos
                            FROM
                            funcionario f
                            INNER JOIN
                            funcionario_departamento fd ON fd.codigo_funcionario = f.func_codigo
                            INNER JOIN
                            departamento d ON fd.codigo_departamento = d.dept_codigo
                            GROUP BY
                                f.func_nome, f.func_dataAdmissao;
            WHERE f.func_codigo = ?`



            const [registros, campos] = await conexao.execute(sql,[termoBusca]);


       
            if(registros.length > 0){
               
                
                    
                 
            }
               
               

              
            
            

        }

        return listaFuncionarios;   

    }
    
}