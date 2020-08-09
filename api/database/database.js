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
    console.log('valoers:', valores);
    return new Promise((resolve, reject) => {
        connection.getConnection((error, conn) => {
            if(error){ 
                reject(new Error({ error: error }) )
            };
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

const createTable = (conn) => {
    const db = `  
    CREATE TABLE IF NOT EXISTS USUARIO(
        id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
    ); 
    CREATE TABLE IF NOT EXISTS PRODUTO(
        id_produto INT PRIMARY KEY AUTO_INCREMENT,
        quantidade INT DEFAULT 0 NOT NULL
    );
    CREATE TABLE IF NOT EXISTS MOVIMENTACOES(
        id_movimentacao INT PRIMARY KEY AUTO_INCREMENT,
        id_produto INT,
        quantidade INT,
        tipo BOOLEAN,
        horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(id_produto) REFERENCES PRODUTO(id_produto)
    );`
    conn.query(db, (err, results, fields) => {
        if(err) return console.log(err);
        console.log("Database criada");
    })
};

module.exports = { connection, exeSqlQuery };