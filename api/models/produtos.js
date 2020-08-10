const database = require('../database/database');

const selectAllProdutos = () => {
    const sql = `SELECT * FROM PRODUTO`;
    return database.exeSqlQuery(sql);
}

const selectProdutoId = (id) => {
    const sql = `SELECT * FROM PRODUTO WHERE id_produto = ?`;
    return database.exeSqlQuery(sql, [id]);
}

const selectProdutosNome = (nomeStr) => {
    const sql = `SELECT * FROM PRODUTO WHERE nome LIKE ?`;
    return database.exeSqlQuery(sql, [nomeStr]);
}

const insertProduto = (nome) => {
    const sql = `INSERT INTO PRODUTO(nome) VALUES(?)`;
    return database.exeSqlQuery(sql, [nome]);
}

module.exports = { selectAllProdutos, selectProdutoId, selectProdutosNome, insertProduto };
