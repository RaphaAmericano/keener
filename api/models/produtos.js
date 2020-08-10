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

const updateProduto = (nome, quantidade, id) => {
    const sql = `UPDATE PRODUTO SET nome = ?, quantidade = GREATEST(quantidade + ?, 0) WHERE id_produto = ?`;
    return database.exeSqlQuery(sql, [nome, quantidade, id]);
}

const updateQuantidadeProduto = ( quantidade, id) => {
    const sql = `UPDATE PRODUTO SET quantidade = ? WHERE id_produto = ?`;
    return database.exeSqlQuery(sql, [quantidade, id]);
}

const deleteProduto = (id) => {
    const sql = `DELETE FROM PRODUTO WHERE id_produto = ?`;
    return database.exeSqlQuery(sql, [id]);
}

module.exports = { selectAllProdutos, selectProdutoId, selectProdutosNome, insertProduto, updateProduto, updateQuantidadeProduto, deleteProduto };
