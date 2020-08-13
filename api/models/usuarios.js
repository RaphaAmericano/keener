const database = require('../database/database');

const selectAllUsuarios = () => { 
    const sql = `SELECT * FROM USUARIO;`;
    return database.exeSqlQuery(sql);
}

const selectUsuarioEmail = (email) => {
    const sql = `SELECT * FROM USUARIO WHERE email = ?`;
    return database.exeSqlQuery(sql, [email]);
}

const selectUsuarioId = (id) => {
    const sql = `SELECT * FROM USUARIO WHERE id_usuario = ?`;
    return database.exeSqlQuery(sql, [id]);
}

const insertUsuario = (usuario) => {
    const sql = `INSERT INTO USUARIO(nome, email, senha) VALUES (?, ?, ?)`;
    return database.exeSqlQuery(sql, [usuario.name, usuario.email, usuario.password]);
}

const updateUsuarioToken = (token, expires, usuario) => {
    const sql = `UPDATE USUARIO SET token = ?, token_expires = ? WHERE id_usuario = ?`;
    return database.exeSqlQuery(sql, [token, expires, usuario]);
}

const updateSenha = (password, id) => {
    const sql = `UPDATE USUARIO SET senha = ? WHERE id_usuario = ?`;
    return database.exeSqlQuery(sql, [password, id]);
}

module.exports = { selectAllUsuarios, insertUsuario, selectUsuarioEmail, selectUsuarioId, updateUsuarioToken, updateSenha }