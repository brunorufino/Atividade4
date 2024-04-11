import mysql from "mysql2/promise";

export default async function Conect() {
  if (global.conexao) {
    return await global.conexao.getConnection();
  }
  const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    porta: "3306",
    password: "",   
    database: "backendaluno16",
    waitForConnections : true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive :true,
    keepAliveInitialDelay: 0
  });
  global.conexao = conexao;
  return await global.conexao.getConnection();
}
