const database = require('../database/database');

const selectAllMovimentacoes = () => {
    const sql = `SELECT * FROM MOVIMENTACAO`;
    return database.exeSqlQuery(sql);
}

const selectMovimentacao = (id) => {
    const sql = `SELECT * FROM MOVIMENTACAO WHERE id_movimentacao = ? `;
    return database.exeSqlQuery(sql, [id]);
}

const insertMovimentacao = (id_produto, id_usuario, quantidade, tipo ) => {
    const sql = `INSERT INTO MOVIMENTACAO(id_produto, id_usuario, quantidade, tipo) VALUES(?, ?, ?, ?)`;
    return database.exeSqlQuery(sql, [id_produto, id_usuario, quantidade, tipo ]);
}

module.exports = { selectAllMovimentacoes, selectMovimentacao, insertMovimentacao }