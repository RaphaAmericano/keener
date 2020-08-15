const mysql = require('mysql');
const connectionHost = { 
    host: "localhost" , //env.port || 'localhost'
    port: 3306, // process.env.MYSQL_PORT
    user:'root',
    password:'root',
    database:'keener',
}; 

const connection = mysql.createPool(connectionHost);

const exeSqlQuery = (sql, valores = []) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((error, conn) => {
            if(error){ 
                reject(new Error({ error: error }) )
            };
            checkTable(conn).then(
                res => {
                    if(res == 0 ){
                        createTable(conn);
                    }
                },
                error => console.error(error)
            );
            
            conn.query(sql, valores, (err, resultados, fields) => {
                conn.release();
                if(err) { 
                    reject(new Error({error: err, response: null}))
                };
                resolve({
                    mensagem: 'Query executada com sucesso',
                    resultado: resultados
                });
            });
        });
    })
}

const checkTable = async (conn) => {
    return new Promise((resolve, reject) => {
        const sql = 'SHOW TABLES';
        conn.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results.length);
        })
    })
    
}

const createTable = (conn) => {  
    const produto = `CREATE TABLE IF NOT EXISTS PRODUTO(id_produto INT PRIMARY KEY AUTO_INCREMENT,nome VARCHAR(255) NOT NULL,quantidade INT DEFAULT 0 NOT NULL)`;
    const usuario = `CREATE TABLE IF NOT EXISTS USUARIO(id_usuario INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, senha VARCHAR(255) NOT NULL,token VARCHAR(255), token_expires TIMESTAMP)`;
    const movimentacao = `CREATE TABLE IF NOT EXISTS MOVIMENTACAO(id_movimentacao INT PRIMARY KEY AUTO_INCREMENT,id_produto INT NOT NULL,id_usuario INT NOT NULL,quantidade INT,tipo BOOLEAN,horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(id_produto) REFERENCES PRODUTO(id_produto) ON DELETE CASCADE,FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario))`;
    conn.query(produto, (err, results, fields) => {
        if(err) return console.log(err);
        console.log("Tabela produto criada");
    });
    conn.query(usuario, (err, results, fields) => {
        if(err) return console.log(err);
        console.log("Tabela usuario criada");
    });
    conn.query(movimentacao, (err, results, fields) => {
        if(err) return console.log(err);
        console.log("Tabela movimentação criada");
    });
};

module.exports = { connection, exeSqlQuery };